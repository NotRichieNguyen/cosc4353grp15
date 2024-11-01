import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.MONGO_URI);

export const connectDB = async () => {
  try {
<<<<<<< HEAD
    const conn = await mongoose.connect(process.env.MONGO_URI);
=======
    if (!process.env.MONGO_URI) {
      console.error("MongoDB URI is not defined in the environment variables");
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

>>>>>>> 35f159a2081833d74a1f145f015d3aa382f05be6
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

<<<<<<< HEAD


=======
>>>>>>> 35f159a2081833d74a1f145f015d3aa382f05be6
