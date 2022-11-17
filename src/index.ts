import path from "path";
import { Logger } from "./structures/logger";
import { Server } from "./structures/server";
import { Colors } from "./utils/colors";
require('dotenv').config({path: path.join(process.cwd(), '.env')})

export const app = new Server({
  port: +process.env.PORT,
  session: {
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    saveUninitialized: true,
    name: 'test',
    resave: true
  }
});
app.start();

process.on('unhandledRejection', (reason, promise) => {
  Logger.error(`${Colors.FG_RED}========================================= Unhandled Rejection Error ========================================${Colors.RESET}`)
  Logger.error(reason)
  Logger.error(promise, false)
  Logger.error(`${Colors.FG_RED}============================================================================================================${Colors.RESET}\n\n`)
})

process.on('uncaughtException', (error, origin) => {
  Logger.error(`${Colors.FG_RED}========================================= Uncaught Exception Error =========================================${Colors.RESET}`)
  Logger.error(error)
  Logger.error(origin, false)
  Logger.error(`${Colors.FG_RED}============================================================================================================${Colors.RESET}\n\n`)
})

process.on('uncaughtExceptionMonitor', (error, origin) => {
  Logger.error(`${Colors.FG_RED}========================================= Uncaught Exception Error =========================================${Colors.RESET}`)
  Logger.error(error)
  Logger.error(origin, false)
  Logger.error(`${Colors.FG_RED}============================================================================================================${Colors.RESET}\n\n`)
})