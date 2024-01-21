import { Router } from "express";
import userController from "../controller/usercontroller"; 
import userauth from "../middleware/Userauth";

const routes = Router();
routes.post("/register", userController.register); 
routes.post("/login", userController.login); 
routes.get("/home", userauth,userController.home); 

export default routes;
