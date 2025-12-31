import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    username : String,
    task : String
});

export const Task = mongoose.model('Task', TaskSchema);