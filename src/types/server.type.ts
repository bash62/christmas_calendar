export interface ServerOptions {
  port: number;
  session: SessionOptions;
}

export interface SessionOptions {
  sameSite: boolean;
  secret: string;
  cookie: {
    maxAge: number;
  };
  saveUninitialized: boolean;
  name: string;
  resave: boolean;
}