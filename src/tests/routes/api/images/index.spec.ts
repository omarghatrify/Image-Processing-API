import supertest from 'supertest';
import { promises as fs, constants, Stats } from 'fs';
import app from '../../../..';

const request = supertest(app);

describe('Images API', () => {
  const imgName = 'fjord';
  const imgSize = [400, 400];
  const resizedPath = `./assets/images/thumb/${imgName}_${imgSize[0]}x${imgSize[1]}.jpg`;

  describe('Responds with full image when no size specified.', () => {
    it('should respond 404 for wrong image', async () => {
      const res = await request.get('/api/images/wrongImgName');
      expect(res.statusCode).toBe(404);
    });

    it('should respond with full image', async () => {
      const res = await request.get('/api/images/encenadaport');
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe('image/jpeg');
    });
  });

  describe('Creates and serves image with specified width and height', () => {
    beforeAll(async () => {
      // Delete cached image to test creating new one.
      try {
        await fs.access(resizedPath, constants.F_OK);
        await fs.rm(resizedPath);
      } catch {
        console.error('Failed to delete chached image');
      }
    });

    it('should respond 404 for wrong image', async () => {
      const res = await request.get(
        '/api/images/wrongImgName?width=500&height=500'
      );
      expect(res.statusCode).toBe(404);
    });

    it('should respond with resized image', async () => {
      const res = await request.get(
        `/api/images/${imgName}?width=${imgSize[0]}&height=${imgSize[1]}`
      );
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe('image/jpeg');
      // Add expect for image width and height??
    });

    it('should chache resized image in thumb folder', async () => {
      await request.get(
        `/api/images/${imgName}?width=${imgSize[0]}&height=${imgSize[1]}`
      );
      await expectAsync(fs.access(resizedPath, constants.F_OK)).toBeResolved();
    });
  });

  describe('Responds with cached image when already exists', () => {
    let OldStats: Stats;
    beforeAll(async () => {
      // Store the chached image stats to compare it later.
      try {
        OldStats = await fs.stat(resizedPath);
      } catch {
        console.error('Failed to get img stats');
      }
    });

    it('should respond 404 for wrong image', async () => {
      const res = await request.get(
        '/api/images/wrongImgName?width=500&height=500'
      );
      expect(res.statusCode).toBe(404);
    });

    it('should use cached image (not create new one)', async () => {
      await request.get(
        `/api/images/${imgName}?width=${imgSize[0]}&height=${imgSize[1]}`
      );
      const newStats = await fs.stat(resizedPath);
      expect(newStats.ctimeMs).toBe(OldStats.ctimeMs);
    });
  });
});
