"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imgProcessing_1 = __importDefault(require("../../../middleware/imgProcessing"));
const images = express_1.default.Router();
images.get('/:imageName', imgProcessing_1.default, (req, res) => {
    if (res.locals.filePath)
        res.sendFile(res.locals.filePath);
    else
        res.sendStatus(500);
    return;
});
exports.default = images;
