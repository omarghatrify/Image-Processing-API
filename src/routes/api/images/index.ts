import express from 'express';
import ProcessImg from '../../../middleware/imgProcessing';

const images = express.Router();

images.get(
  '/:imageName',
  ProcessImg,
  (req: express.Request, res: express.Response): void => {
    if (res.locals.filePath) res.sendFile(res.locals.filePath);
    else res.sendStatus(500);
    return;
  }
);

export default images;
