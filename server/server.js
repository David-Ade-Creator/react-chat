import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from "cors";
import Pusher from "pusher";
import jwt from 'jsonwebtoken';
import Messages from "./models/messageModel.js";
import User from "./models/userModel.js";
import config from "./config.js";

const app = express();
//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const connect = 
mongoose.connect
(process.env.MONGODB_URL || 'mongodb+srv://standave:pxrLJs8pVbvg9K1v@cluster0.9pwtn.mongodb.net/standave?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology: true ,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const pusher = new Pusher({
    appId: '1067273',
    key: 'c84134a807d7c9fe83c4',
    secret: 'de31bc390c832e879354',
    cluster: 'ap2',
    encrypted: true
  });

  const db = mongoose.connection;

  db.once('open', ()=> {
      console.log('Db connected');

      const msgCollection = db.collection("messagecontents");
      const changeStream = msgCollection.watch();

     changeStream.on('change', (change)=>{
          console.log("change occured",change);

          if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', 
            {
                name: messageDetails.name,
                message: messageDetails.message,
                received: messageDetails.received
            });
        } else {
            console.log('error trigerring pusher');
        }
      });
      
  });

  app.post('/api/users/signup', async (req, res) => {
    const {name, email, password} = req.body;
   
      User.findOne({
        email
      }).exec((err,doc)=>{
        if (doc) {
          return res.status(400).json({
            errors:'Email is taken'
          });
        }
      });
   
      const user = new User({
       name,
       email,
       password
     });
   
     user.save((err,user)=>{
       if (err) {
         console.log('Save error', errorHandler(err));
         return res.status(401).json({
           error: 'Error occurred'
         });
       } else {
         return res.json({
           success: true,
           message: user,
           message: 'Signup success'
         });
       }
     });   
   });


   
app.post('/api/users/signin', async (req, res) => {
    const { email, password } = req.body;
    
      // check if user exist
      User.findOne({
        email
      }).exec((err,user)=> {
        if (err || !user) {
          return res.status(400).json({
            errors: 'User with that email does not exist. Please signup'
          });
        }
        //authenticate
        if(!user.authenticate(password)) {
          return res.status(400).json({
            error: 'Email and password do not match'
          });
        }
  
        return res.json({
          user:{
            _id : user._id,
            name: user.name,
            email: user.email,
            token: getToken(user),
          },
        });
      });
      const getToken = (user) => {
        return jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            config.JWT_SECRET,
            {
                expiresIn: '48h',
            }
        );
    };
    });

    app.get("/api/users/:userId", async (req, res)=> {
        const userId = req.params.userId;
        const users = await User.find({});
        if(users){
          res.send(users);
        }else{
          res.status(404).send("Users NOt Found")
        }
      });

app.get('/messages/sync', (req,res) => {
    Messages.find((err,data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});

app.get('/messages/filter', async (req,res) => {  

  const filteredmsg = await Messages.find({ name: req.body.name});
  if(filteredmsg) {
    res.status(201).send(filteredmsg)
  } else {
    res.status(500).send(err)
  }
});

app.post('/api/v1/messages/new', (req,res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    });
});


const port = process.env.PORT || 7000;




app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})