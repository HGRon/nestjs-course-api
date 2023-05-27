import * as awsServerless from '@vendia/serverless-express';
import { createApp } from './setup';

let cachedServer;

// Create the Nest.js server and convert it into an Express.js server
async function bootstrapServer() {
  if (!cachedServer) {
    const nestApp = await createApp();

    cachedServer = awsServerless.configure({
      app: nestApp.getHttpAdapter().getInstance(),
      binarySettings: {
        isBinary: () => true,
        contentTypes: ['application/pdf'],
      },
    });
  }

  return cachedServer;
}

const awsHandler = async (...params) => {
  cachedServer = await bootstrapServer();

  return cachedServer(...params);
};

exports.handler = awsHandler;
