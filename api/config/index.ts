import * as dbOptions from './database.js';

export const dbConfig = dbOptions[process.env.NODE_ENV ?? 'development'];

export { default as AppConfig } from './appConfig';
