import express, { Express } from "express";
import session from 'express-session';
import path from "path";
import { globPromise } from "../utils/glob-promise";
import { ServerOptions, SessionOptions } from "../types/server.type";
import { Logger } from "./logger";

export class Server {

  public app: express.Application;

  private port: number = 3000;
  private sessionConfig: SessionOptions;

  constructor(options: ServerOptions) {
    this.port = options.port;
    this.sessionConfig = options.session;

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

  static async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerRoutes(): Promise<void> {
    const routesFiles = await globPromise(`${__dirname}/../controllers/**/*.controller.ts`);
    for (const routesFile of routesFiles) {
      const route: any = await Server.importFile(routesFile);
      this.app.use(route.path, route.router);
      Logger.info(`Registered route: ${route.path}`);
    }
  }

  start() {
    this.app.use(session({...this.sessionConfig}));

    this.registerRoutes().then(() => {
      Logger.info(`Registered ${this.app._router.stack.length} routes`);
    });

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