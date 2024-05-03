import mongoose from "mongoose";
import { MONGO_URL } from "$env/static/private";

// Define the states as constants for better readability and maintenance
const ConnectionState = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
  uninitialized: 4
};

// Tracks the current state of the MongoDB connection
const mongoConnection = {
  isConnected: ConnectionState.disconnected
};

/**
 * Ensures a MongoDB connection is established if not already connected.
 */
export const dbConnect = async () => {
  console.log("Attempting to connect to MongoDB...");
  if (mongoConnection.isConnected === ConnectionState.connected) {
    console.log("Already connected.");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === ConnectionState.connected) {
      console.log("Using existing connection.");
      return;
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(MONGO_URL);
  mongoConnection.isConnected = ConnectionState.connected;
  console.log("Connected to MongoDB successfully.");
};

/**
 * Disconnects from MongoDB if not in development mode and if currently connected.
 */
export const dbDisconnect = async () => {
  if (process.env.NODE_ENV === "development") {
    console.log("Disconnect skipped in development mode.");
    return;
  }
  if (mongoConnection.isConnected === ConnectionState.disconnected) {
    console.log("No active MongoDB connection to disconnect.");
    return;
  }

  await mongoose.disconnect();
  mongoConnection.isConnected = ConnectionState.disconnected;
  console.log("Disconnected from MongoDB.");
};
