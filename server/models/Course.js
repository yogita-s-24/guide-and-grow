import { Schema, model } from "mongoose";

const CourceSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: '-'
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
    },
    duration: {
        type: String,
        required: true
    }
},
    { timestamps: true });

const Course = model('Courses', CourceSchema);

export default Course;

