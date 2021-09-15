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
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = require("fs");
const __1 = __importDefault(require("../../../.."));
const request = (0, supertest_1.default)(__1.default);
describe('Images API', () => {
    const imgName = 'fjord';
    const imgSize = [400, 400];
    const resizedPath = `./assets/images/thumb/${imgName}_${imgSize[0]}x${imgSize[1]}.jpg`;
    describe('Responds with full image when no size specified.', () => {
        it('should respond 404 for wrong image', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images/wrongImgName');
            expect(res.statusCode).toBe(404);
        }));
        it('should respond with full image', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images/encenadaport');
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toBe('image/jpeg');
        }));
    });
    describe('Creates and serves image with specified width and height', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            // Delete cached image to test creating new one.
            try {
                yield fs_1.promises.access(resizedPath, fs_1.constants.F_OK);
                yield fs_1.promises.rm(resizedPath);
            }
            catch (_a) {
                console.error('Failed to delete chached image');
            }
        }));
        it('should respond 404 for wrong image', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images/wrongImgName?width=500&height=500');
            expect(res.statusCode).toBe(404);
        }));
        it('should respond with resized image', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get(`/api/images/${imgName}?width=${imgSize[0]}&height=${imgSize[1]}`);
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toBe('image/jpeg');
            // Add expect for image width and height??
        }));
        it('should chache resized image in thumb folder', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request.get(`/api/images/${imgName}?width=${imgSize[0]}&height=${imgSize[1]}`);
            yield expectAsync(fs_1.promises.access(resizedPath, fs_1.constants.F_OK)).toBeResolved();
        }));
    });
    describe('Responds with cached image when already exists', () => {
        let OldStats;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            // Store the chached image stats to compare it later.
            try {
                OldStats = yield fs_1.promises.stat(resizedPath);
            }
            catch (_a) {
                console.error('Failed to get img stats');
            }
        }));
        it('should respond 404 for wrong image', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get('/api/images/wrongImgName?width=500&height=500');
            expect(res.statusCode).toBe(404);
        }));
        it('should use cached image (not create new one)', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request.get(`/api/images/${imgName}?width=${imgSize[0]}&height=${imgSize[1]}`);
            const newStats = yield fs_1.promises.stat(resizedPath);
            expect(newStats.ctimeMs).toBe(OldStats.ctimeMs);
        }));
    });
});
