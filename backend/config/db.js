import mongoose from 'mongoose';
const connectDB = async()=>{
mongoose.connection.on('connected',()=>{
  console.log("DB Conneted");
})
await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`)
}
export default connectDB;