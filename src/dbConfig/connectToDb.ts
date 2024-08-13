import mongoose, { Mongoose } from "mongoose";

declare global {
  var mongoose: {
    connection: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

global.mongoose = global.mongoose || {
  connection: null,
  promise: null,
};

export const connectToDb = async () => {
  try {
    if (global.mongoose && global.mongoose.connection) {
      //console.log("Connecting from existing connection");
      return global.mongoose.connection;
    }

    const connectionString = process.env.MONGODB_URI!;

    if (!connectionString) {
      throw new Error("MONGODB_URI is not defined");
    }

    const promise = mongoose.connect(connectionString, {
      autoIndex: true,
    });

    global.mongoose = {
      connection: await promise,
      promise,
    };

    //console.log("Initialized connection to mongoDB");

    return await promise;
  } catch (error: any) {
    //console.log(error);
    throw new Error(error);
  }
};
