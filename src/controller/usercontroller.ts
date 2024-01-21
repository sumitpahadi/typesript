import user from "../model/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
const saltround: number = 10;
import * as jwt from "jsonwebtoken"; // Change this line

const secretkey: string = "sumitrawat";

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    interface userinfo {
      username: string;
      email: string;
      password: string;
    }
    const { username, email, password }: userinfo = req.body;
    console.log(username, email, password);
    const checking_exitence = await user.findOne({ email });
    if (checking_exitence) {
      return res.status(200).json({
        msg: "user is already registered",
      });
    } else {
      console.log(password);

      const hashpassword = bcrypt.hashSync(password, saltround);
      console.log("hashpassword", hashpassword);
      const userdata = await user.create({
        username: username,
        email: email,
        password: hashpassword,
      });
      return res.status(200).json({
        msg: "user is registered",
        data: userdata,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    interface logininfo {
      email: string;
      password: string;
    }
    const { email, password }: logininfo = req.body;
    const checking = await user.findOne({ email });
    if (!checking) {
      return res.status(200).json({
        msg: "user is not registered",
      });
    } else {
      const compare = bcrypt.compareSync(password, checking.password);
      if (!compare) {
        return res.status(200).json({
          msg: "password is wrong",
        });
      } else {
        const token = await jwt.sign({ email: email }, secretkey, {
          expiresIn: "21 days",
        });

        return res.status(200).json({
          email: email,
          password: password,
          msg: "you are logged in",
          token: token,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};


const home=async(req:Request,res:Response):Promise<Response>=>{
    return res.status(200).json(
        {
            msg:"welcome"
        }
    )
}


export default { register, login,home }; // Change this line
