"use strict";
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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const images_1 = require("../utility/images");
const imagesDir = path_1.default.resolve('./assets/images');
const fullDir = path_1.default.join(imagesDir, './full');
const thumbDir = path_1.default.join(imagesDir, './thumb');
fs_1.promises.access(thumbDir, fs_1.constants.F_OK).catch(() => fs_1.promises.mkdir(thumbDir));
const ProcessImg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const imgName = req.params.imageName;
    const imgPath = path_1.default.join(fullDir, imgName + '.jpg');
    try {
        yield fs_1.promises.access(imgPath, fs_1.constants.F_OK);
        const w = parseInt(req.query.width);
        const h = parseInt(req.query.height);
        if (!w || !h) {
            res.locals.filePath = imgPath;
            return next();
        }
        const thumbPath = path_1.default.join(thumbDir, `${imgName}_${w}x${h}.jpg`);
        try {
            yield fs_1.promises.access(thumbPath, fs_1.constants.F_OK);
        }
        catch (error) {
            yield (0, images_1.resizeImage)(imgPath, thumbPath, w, h).catch(() => res.sendStatus(500));
        }
        finally {
            res.locals.filePath = thumbPath;
            next();
        }
    }
    catch (error) {
        res.sendStatus(404);
    }
});
exports.default = ProcessImg;
