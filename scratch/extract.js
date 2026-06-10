const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
try {
  execSync(`"${ffmpeg}" -i "public/assets/EstateFlow – Modern Real Estate Website Template - Brave 2026-06-10 11-23-07.mp4" -vf "fps=1" -vframes 5 "public/assets/marquee_extract_%d.jpg"`, { stdio: 'inherit' });
  console.log('Extraction complete');
} catch (e) {
  console.error(e);
}
