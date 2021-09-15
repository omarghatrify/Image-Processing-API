import express from 'express';
import path from 'path';
import { promises as fs, constants } from 'fs';
import { resizeImage } from '../utility/images';

const imagesDir = path.resolve('./assets/images');
const fullDir = path.join(imagesDir, './full');
const thumbDir = path.join(imagesDir, './thumb');
fs.access(thumbDir, constants.F_OK).catch(() => fs.mkdir(thumbDir));

const ProcessImg = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const imgName = req.params.imageName;
  const imgPath = path.join(fullDir, imgName + '.jpg');
  try {
    await fs.access(imgPath, constants.F_OK);
    if (!req.query.width && !req.query.height) {
      res.locals.filePath = imgPath;
      return next();
    }
    const w = Number(req.query.width);
    const h = Number(req.query.height);
    if (isNaN(w) || isNaN(h) || w < 1 || h < 1) {
      res
        .status(400)
        .send('Only positive numbers can be used for width/height.');
      return;
    }
    const thumbPath = path.join(thumbDir, `${imgName}_${w}x${h}.jpg`);
    try {
      await fs.access(thumbPath, constants.F_OK);
    } catch (error) {
      await resizeImage(imgPath, thumbPath, w, h).catch(() =>
        res.sendStatus(500)
      );
    } finally {
      res.locals.filePath = thumbPath;
      next();
    }
  } catch (error) {
    res.sendStatus(404);
  }
};

export default ProcessImg;
