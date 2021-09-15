import express from 'express';
import images from './images';
const api = express.Router();
api.use('/images', images);
export default api;
