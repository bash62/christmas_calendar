import express from "express";

export class Route {
  public path: string;
  public router: express.Router;

  constructor(path: string) {
    this.path = path;
    this.router = express.Router();
  }

  public get(path: string, callback: express.RequestHandler) {
    this.router.get(path, callback);
    return this;
  }

  public post(path: string, callback: express.RequestHandler) {
    this.router.post(path, callback);
    return this;
  }

  public put(path: string, callback: express.RequestHandler) {
    this.router.put(path, callback);
    return this;
  }

  public delete(path: string, callback: express.RequestHandler) {
    this.router.delete(path, callback);
    return this;
  }

  public patch(path: string, callback: express.RequestHandler) {
    this.router.patch(path, callback);
    return this;
  }
}