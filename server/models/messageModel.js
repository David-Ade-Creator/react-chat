import mongoose from 'mongoose';

const whatsappSchema = mongoose.Schema({
    message : String,
    name: String,
    received: Boolean
}, {timestamps: true});

const messagecontents = mongoose.model('messagecontents', whatsappSchema)

export default messagecontents;