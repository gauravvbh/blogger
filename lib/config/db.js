import mongoose from "mongoose";

export const connectDb = async () => {
    await mongoose.connect('mongodb+srv://gauravrajahela884:7XrG2pd31nEa4ipp@cluster0.h01vx.mongodb.net/blogger')
    console.log('Connected to MongoDB');
}