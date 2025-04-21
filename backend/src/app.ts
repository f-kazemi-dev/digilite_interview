import path from 'path';
import { feathers } from '@feathersjs/feathers';
import { Application } from './declarations';
import configuration from '@feathersjs/configuration';
import express, { json, urlencoded, rest, errorHandler, notFound,
  serveStatic } from '@feathersjs/express';
import favicon from 'serve-favicon';
import middleware from './middleware';
import socketio from '@feathersjs/socketio';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from './utils/logger';
import { services } from './services';
import { appHooks } from './app.hooks';

const app: Application = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing

// Enable security, CORS, and JSON body parsing
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host the public folder
app.use('/', serveStatic(app.get('public')));

// Set up REST transport
app.configure(rest());

// Set up Socket.io transport
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);

// app.configure(authentication);

// Set up services
app.configure(services);

// app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(notFound());

// Set up error handling
app.use(errorHandler({ logger, html: false }));


// Set up application hooks
app.hooks(appHooks);

export { app }; 