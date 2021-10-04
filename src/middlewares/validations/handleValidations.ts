import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Validate if there is any validation errors
function handleValidations(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  } else {
    next();
  }
}

export default handleValidations;
