import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
})

const EmployeeModel = mongoose.model("users", EmployeeSchema)
export default  EmployeeModel