const { Jimp } = require('jimp');

const inputPath = 'public/assets/panthers logo.png';
const outputPath = 'public/assets/panthers logo transparent.png';

async function processImage() {
  try {
    const image = await Jimp.read(inputPath);
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Calculate alpha based on the brightest color channel
      // A black pixel (0,0,0) will have 0 alpha (fully transparent)
      const alpha = Math.max(r, g, b); 
      
      this.bitmap.data[idx + 3] = alpha;
      
      if (alpha > 0) {
        // Un-premultiply the RGB values so the anti-aliased edges retain their original true color
        // without getting darkened by the removed black background!
        this.bitmap.data[idx + 0] = Math.min(255, Math.round(r * 255 / alpha));
        this.bitmap.data[idx + 1] = Math.min(255, Math.round(g * 255 / alpha));
        this.bitmap.data[idx + 2] = Math.min(255, Math.round(b * 255 / alpha));
      }
    });
    
    await image.write(outputPath);
    console.log('Successfully created transparent logo!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();
