import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
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

const Course = model('Courses', CourseSchema);

export default Course;

