import sharp from 'sharp';

async function resizeImage(
  source: string | Buffer,
  dist: string,
  width: number,
  height: number
): Promise<sharp.OutputInfo> {
  if (width <= 0) throw new Error("Can't resize to a width less than 1");
  if (height <= 0) throw new Error("Can't resize to a height less than 1");
  return sharp(source).resize(width, height).toFile(dist);
}

export { resizeImage };
