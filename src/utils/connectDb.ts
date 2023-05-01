import mongoose from "mongoose";

if (!process.env.MONGODB_URL) {
  throw new Error("please add MONGODB_URL TO .env file");
}

const MONGODB_URL = process.env.MONGODB_URL;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};
let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = {};
  //   cached.globalWithMongoose.mongoose = { connection: null, promise: null };
  cached = { connection: null, promise: null };
}
async function connectDb() {
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = mongoose
      .connect(MONGODB_URL, options)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
      });
  }
  cached.connection = await cached.promise;
  return cached.connection;
}

export default connectDb;
