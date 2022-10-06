import mongoose from 'mongoose';

const travelSchema =mongoose.Schema({
    title: String,
    description: String,
    name:String,
    authorName:String,
    createdAt:{ type:Date, default: new Date()},
    tags:[String],
    imageFile: String,
    likes:{type: [String],
            default:0,},
  

});
export default mongoose.model('Travel',travelSchema);