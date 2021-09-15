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
exports.resizeImage = void 0;
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
function resizeImage(source, dist, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        if (width <= 0)
            throw new Error("Can't resize to a width less than 1");
        if (height <= 0)
            throw new Error("Can't resize to a height less than 1");
        const resized = yield (0, sharp_1.default)(source).resize(width, height).toBuffer();
        return fs_1.promises.writeFile(dist, resized);
    });
}
exports.resizeImage = resizeImage;
