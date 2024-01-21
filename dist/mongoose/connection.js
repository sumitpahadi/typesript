"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const client = (url) => {
    mongoose_1.default.connect(url)
        .then(() => console.log("mongoose is connected"))
        .catch((error) => console.log(error));
};
exports.default = client;
