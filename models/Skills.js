import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  skillSet: {
    type: [String],
    default: []
  }
});

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);
