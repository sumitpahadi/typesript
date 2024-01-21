import express, { Express } from "express";
import dotenv from "dotenv"
import routes from "./routes/route";
import client from "./mongoose/connection";
dotenv.config()
const app: Express = express();
app.use(express.json())
app.use("/",routes)

const port: Number = 4000;
const connecting = async (): Promise<void> => {
  await client( process.env.mongoourl as string );
  app.listen(port, () => {
    console.log("server is running on port number ", port);
  });
};

connecting();
