export interface ServerOptions {
  port: number;
  session: SessionOptions;
}

export interface SessionOptions {
  secret: string;
  cookie: {
    maxAge: number;
  };
  saveUninitialized: boolean;
  name: string;
  resave: boolean;
}