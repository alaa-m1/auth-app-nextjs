import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
  throw new Error("please add DATABASE_URL TO .env file");
}

const DATABASE_URL = process.env.DATABASE_URL;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};
let cached = globalWithMongoose.mongoose;

if (!cached) {
  console.log("cachedcachedcached=", cached);
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
      .connect(DATABASE_URL, options)
      .then((mongoose) => {
        console.log("connection is OK");
        return mongoose;
      })
      .catch((error) => {
        console.log("connection error=", error);
      });
  }
  cached.connection = await cached.promise;
  console.log("cached.connection", cached.connection);
  return cached.connection;
}

export default connectDb;
