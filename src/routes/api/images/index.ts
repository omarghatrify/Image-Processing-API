import express from 'express';
import ProcessImg from '../../../middleware/imgProcessing';

const images = express.Router();

images.get('/:imageName', ProcessImg, async (req, res) => {
  if (res.locals.filePath) return res.sendFile(res.locals.filePath);
  else return res.sendStatus(500);
});

export default images;
