import "reflect-metadata"
import express, { Express } from "express";
import session from 'express-session';
import path from "path";
import homeController from "../controllers/home.controller";
import { ServerOptions, SessionOptions } from "../types/server.type";
import { Logger } from "./logger";
import {AppDataSource} from "../database/data-source";
import {Entities} from "../database/entities";
import { fetchSunDate } from "../utils/fetch-sundate";
export class Server {

  public app: express.Application;

  private port: number = 3000;
  public db: AppDataSource; 

  private sessionConfig: SessionOptions;

  constructor(options: ServerOptions) {
    
    this.port = options.port;
    this.sessionConfig = options.session;
    this.db = new AppDataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "mago_database",
      synchronize: true,
      logging: ["error"],
      entities: Entities,
    });

    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "../views"));
    this.app.use('/css', express.static(path.join(__dirname, '..', 'public', 'styles')))
    this.app.use('/js', express.static(path.join(__dirname, '..', 'public', 'js')));
    this.app.use('/fonts', express.static(path.join(__dirname, '..', 'public', 'fonts')))
    this.app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')))
  }

  start() {
    this.app.use(session({...this.sessionConfig}));

    this.app.use(homeController.path, homeController.router);

    /*this.app.get('*', function(req, res, next) {
      let err = new Error("Page Doesn't Exist");
      res.statusCode = 404;
      next(err);
    });*/

    this.app.listen(this.port, () => {
      Logger.success(`Server started on port ${this.port}`);
    });
  }
}