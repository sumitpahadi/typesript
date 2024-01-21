"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = __importDefault(require("../controller/usercontroller"));
const Userauth_1 = __importDefault(require("../middleware/Userauth"));
const routes = (0, express_1.Router)();
routes.post("/register", usercontroller_1.default.register);
routes.post("/login", usercontroller_1.default.login);
routes.get("/home", Userauth_1.default, usercontroller_1.default.home);
exports.default = routes;
