import mongoose from 'mongoose';

const WorkSchema = new mongoose.Schema({
  name: String,
  description: String, 
  link:String,
  category:{
    type:String,
    enum:["AI","Website","Programming"]
  }
});

export default mongoose.models.Work || mongoose.model('Work', WorkSchema);