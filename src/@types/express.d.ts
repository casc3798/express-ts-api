declare namespace Express {
  interface Request {
    userInfo?: {
      id: number;
      email: string;
      device_id: string;
    };
    file: any;
  }
}
