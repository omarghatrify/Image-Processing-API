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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const images_1 = require("../../utility/images");
const imgName = 'fjord';
const imgPath = `./assets/images/full/${imgName}.jpg`;
const imgSize = [1200, 400];
const resizedPath = `./assets/images/thumb/${imgName}_${imgSize[0]}x${imgSize[1]}.jpg`;
describe('Images Utility', () => {
    describe('Creates a resized copy of the source image', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            //Delete cached image to test creating a new one.
            try {
                yield fs_1.promises.access(resizedPath, fs_1.constants.F_OK).then();
                fs_1.promises.rm(resizedPath);
                // eslint-disable-next-line no-empty
            }
            catch (_a) { }
        }));
        it('should create a resized image in thumb folder', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expectAsync((0, images_1.resizeImage)(imgPath, resizedPath, imgSize[0], imgSize[1])).toBeResolved();
            yield expectAsync(fs_1.promises.access(resizedPath, fs_1.constants.F_OK)).toBeResolved();
        }));
        it('should throw error on invalid width', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expectAsync((0, images_1.resizeImage)(imgPath, resizedPath, -100, imgSize[1])).toBeRejected();
        }));
        it('should throw error on invalid height', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expectAsync((0, images_1.resizeImage)(imgPath, resizedPath, imgSize[0], -100)).toBeRejected();
        }));
    });
});
