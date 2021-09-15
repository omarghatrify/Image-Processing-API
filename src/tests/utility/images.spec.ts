import { promises as fs, constants } from 'fs';
import { resizeImage } from '../../utility/images';

const imgName = 'fjord';
const imgPath = `./assets/images/full/${imgName}.jpg`;
const imgSize = [1200, 400];
const resizedPath = `./assets/images/thumb/${imgName}_${imgSize[0]}x${imgSize[1]}.jpg`;

describe('Images Utility', () => {
  describe('Creates a resized copy of the source image', () => {
    beforeAll(async () => {
      //Delete cached image to test creating a new one.
      try {
        await fs.access(resizedPath, constants.F_OK).then();
        fs.rm(resizedPath);
        // eslint-disable-next-line no-empty
      } catch {}
    });
    it('should create a resized image in thumb folder', async () => {
      await expectAsync(
        resizeImage(imgPath, resizedPath, imgSize[0], imgSize[1])
      ).toBeResolved();
      await expectAsync(fs.access(resizedPath, constants.F_OK)).toBeResolved();
    });
    it('should throw error on invalid width', async () => {
      await expectAsync(
        resizeImage(imgPath, resizedPath, -100, imgSize[1])
      ).toBeRejected();
    });
    it('should throw error on invalid height', async () => {
      await expectAsync(
        resizeImage(imgPath, resizedPath, imgSize[0], -100)
      ).toBeRejected();
    });
  });
});
