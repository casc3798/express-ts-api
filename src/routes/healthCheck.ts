import express, { Request, Response } from "express";
const healthCheckRouter = express.Router();

// Set route for testing
healthCheckRouter.get("/", async (req: Request, res: Response) => {
  res.json({ message: "API funcionando!" });
});

export default healthCheckRouter;
