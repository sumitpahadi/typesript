import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"; // Change this line
const secretkey: string = "sumitrawat";
const userauth = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const bearer = req.headers['authorization']
        if (bearer == undefined) {
            return res.status(200).json(
                {
                    msg: "no tokken"
                }
            )


        }
        else {
            const token = bearer.split(" ")[1]
            console.log(token)
            if (token) {
                const verify = jwt.verify(token, secretkey)
                if (verify) {
                    next()
                    return res;

                }
                else {
                    return res.status(200).json({
                        msg: "unauthorised user"
                    })
                }

            }
            else {
                return res.status(200).json(
                    {
                        msg: "again no token"
                    }
                )
            }

        }

    } catch (error) {
        return res.status(500).json(
            {
                msg: error
            }
        )

    }
}
export default userauth