import { promises as fs } from 'fs';
import sharp from 'sharp';

async function resizeImage(
  source: string | Buffer,
  dist: string,
  width: number,
  height: number
): Promise<void> {
  if (width <= 0) throw new Error("Can't resize to a width less than 1");
  if (height <= 0) throw new Error("Can't resize to a height less than 1");
  const resized = await sharp(source).resize(width, height).toBuffer();
  return fs.writeFile(dist, resized);
}

export { resizeImage };
