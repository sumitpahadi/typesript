"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../model/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltround = 10;
const jwt = __importStar(require("jsonwebtoken")); // Change this line
const secretkey = "sumitrawat";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);
        const checking_exitence = yield User_1.default.findOne({ email });
        if (checking_exitence) {
            return res.status(200).json({
                msg: "user is already registered",
            });
        }
        else {
            console.log(password);
            const hashpassword = bcrypt_1.default.hashSync(password, saltround);
            console.log("hashpassword", hashpassword);
            const userdata = yield User_1.default.create({
                username: username,
                email: email,
                password: hashpassword,
            });
            return res.status(200).json({
                msg: "user is registered",
                data: userdata,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            msg: error,
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const checking = yield User_1.default.findOne({ email });
        if (!checking) {
            return res.status(200).json({
                msg: "user is not registered",
            });
        }
        else {
            const compare = bcrypt_1.default.compareSync(password, checking.password);
            if (!compare) {
                return res.status(200).json({
                    msg: "password is wrong",
                });
            }
            else {
                const token = yield jwt.sign({ email: email }, secretkey, {
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
    }
    catch (error) {
        return res.status(500).json({
            msg: error,
        });
    }
});
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        msg: "welcome"
    });
});
exports.default = { register, login, home }; // Change this line
