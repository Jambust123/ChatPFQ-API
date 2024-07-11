const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");
const dotenv = require("dotenv");

// Determine the current environment
const ENV = process.env.NODE_ENV || "development";

// Load the appropriate .env file
dotenv.config({ path: path.resolve(__dirname, `../.env.${ENV}`) });

const mongoUri = process.env.MONGODB_URI;

const dbName = "ChatPFQ";

let client;

async function connect() {
  try {
    if (!client) {
      client = new MongoClient(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
    }
    return client;
  } catch (error) {
    throw error
  }
}

async function close() {
  try {
    if (client) {
      await client.close();
      client = undefined;
    }
  } catch (error) {
    throw error
  }
}

function getClient() {
  console.log(client, 'client from get client')
  try {
    if (!client) {
      throw new Error('MongoDB client is not initialized.');
    }
    return client;
  } catch (error) {
    throw error
  }
}

module.exports = {
  connect,
  close,
  getClient,
};