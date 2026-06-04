const { Jimp } = require('jimp');

const inputPath = 'public/assets/panthers logo new.png';
const outputPath = 'public/assets/panthers logo new.png';

async function cropImage() {
  try {
    const image = await Jimp.read(inputPath);
    
    // Automatically crop all the transparent empty space around the logo
    image.autocrop();
    
    await image.write(outputPath);
    console.log('Successfully autocropped the transparent logo!');
  } catch (error) {
    console.error('Error cropping image:', error);
  }
}

cropImage();
