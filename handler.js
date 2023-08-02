'use strict';
import {server,io} from './index.js'
import serverless from 'serverless-http'

const appHandler = serverless(server);
const socketHandler=serverless(server);
export {appHandler,socketHandler}
