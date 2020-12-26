import mongoose from 'mongoose';
 
const taskSchema = new mongoose.Schema(
  {
    //text
    discription: {
      type: String,
      //required: true,
    },
    start_date: {
      type: Date,
      //required: true,
    },
    end_date: {
      type: Date,
      //required: true,
    },
    type: {
      type: String,
      //required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },//associate msg with user
  },
  { timestamps: true },
);
 
const Task = mongoose.model('Task', taskSchema);
 
export default Task;

