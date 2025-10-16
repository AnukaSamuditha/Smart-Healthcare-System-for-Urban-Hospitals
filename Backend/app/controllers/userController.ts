import { Request, Response } from "express";
import User from "#models/User.js";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, type } = req.body;

   if(!email || !username || !password || !type){
      res.status(400).json({
        message : "Missing required information"
      })
      return;
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      res.status(409).json({
        message: "Email already exists!",
      });
      return;
    }

    const profilePicture = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(username)}`

    const newUser = new User({
      username,
      email,
      profilePicture,
      role : type,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    try {
      const savedUser = await newUser.save();
      const payLoad = {
        user: {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        },
      };

      const { password, ...userWithoutPassword } = savedUser.toObject();
      void password;

      jwt.sign(
        payLoad,
        JWT_SECRET as string,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            res.status(500).json({
              message: "Error creating jwt token",
              error: err,
            });
            return;
          }
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24,
          });
          res.status(201).json({
            message: "user registered successfully",
            user: userWithoutPassword,
            token,
          });
        },
      );
    } catch (error) {
      res.status(500).json({
        message: "Error creating the user",
        error,
      });
      console.log(error);
    }
  } catch (err) {
    res.status(500).json({
      message: "Error creating the user",
      error: err,
    });
    console.log(err);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email or password was incorrect",
      });
    }

    const isPWMatching = await bcrypt.compare(password, user.password);
    if (!isPWMatching) {
      return res.status(400).json({
        message: "Email or password was incorrect",
      });
    }

    const payLoad = {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };

    jwt.sign(
      payLoad,
      JWT_SECRET as string,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          return res.status(500).json({
            message: "Error creating jwt token",
            error: error.message,
          });
        }

        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24,
        });

        res.status(200).json({
          message: "User logged in successfully",
          token,
          data: {
            id: user._id,
            email: user.email,
          },
        });
      },
    );
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Error logged in the user",
      error: err.message,
    });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    //const token = req.header("Authorization")?.split(" ")[1];
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "No token available, authorization denied",
      });
    }

    //const decodedToken = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    //const remainingExpiry = decodedToken.exp - Math.floor(Date.now() / 1000);
    // await redisClient.set(token, "blacklisted", { EX: remainingExpiry });
    res.clearCookie("token");
    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Error in log out handling",
      error: err.message,
    });
  }
};

const userInfo = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    req = decoded.user;
    const user = await User.findById(decoded.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "Invalid user id",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Error getting user info",
      error: err.message,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({});

    if (allUsers.length === 0) {
      res.status(400).json({
        message: "No users to fetch",
      });
    }

    res.status(200).json({
      message: "Fetched all the users",
      data: allUsers,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Error in fetching all users",
      error: err.message,
    });
  }
};

const deleteUsers = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User was deleted successfully.",
      deletedUser,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Error deleting the user.",
      error: err.message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        message: "Missing required information",
      });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      message: "User data fetched successfully",
      user,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  }
};

export {
  createUser,
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  deleteUsers,
  userInfo,
};