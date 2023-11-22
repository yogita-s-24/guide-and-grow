import {model, Schema} from "mongoose"

const studentSchema = new Schema({
name : {
  type : String,
  required : true 
},

email:{
type : String,
required : true,
unique : true
},

mobileNo:{
  type : Number,
  required : true,
  unique : true
},

parentNo:{
  type : Number,
  required : true,
},

birthDate:{
  type : Date,
  required:true

},

collegename:{
  type:String,
  required :true,
},

city:{
  type:String,
  required :true,
},

},{timestamps:true})

const Student = model("Student",studentSchema);

export default Student;
