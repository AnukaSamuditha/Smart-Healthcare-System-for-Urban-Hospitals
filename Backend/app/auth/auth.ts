import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({
      message: "No token available, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    (req as AuthRequest).user = decoded.user;
    next();
  } catch (error) {
    const err = error as Error;
    console.log("Something is wrong with the auth middleware", err.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

// const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     //const token = req?.headers?.authorization?.split(" ")[1];

//     next();
//   } catch (error) {
//     const err = error as Error;
//     res.status(500).json({
//       message: "Error in redis",
//       error: err.message,
//     });
//   }
// };

const authorize = (roles: string[] = []): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).json({
          message: "Access Denied, no token provided",
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
      (req as AuthRequest).user = decoded.user;

      if (!roles.includes((req as AuthRequest).user.role)) {
        return res.status(401).json({
          message: "Access Denied, no permission to access the resource",
        });
      }

      next();
    } catch (error) {
      res.status(401).json({
        message: "Invalid Token in authorizing",
        error,
      });
    }
  };
};

export { authenticate, authorize };