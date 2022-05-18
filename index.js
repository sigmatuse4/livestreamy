const HttpServer = require('./HttpServer.js');
HttpServer.execute(3000);

const FFMPEG = require('ffmpeg-static');
const { spawn } = require('child_process');

if (!process.env.YOUTUBE_RTMP) throw new TypeError(`Your YouTube RTMP url is empty`);
const spawnConfig = `-stream_loop -1 -re -i video.mp4 -stream_loop -1 -re -i ${process.env.AUDIO_FILENAME} -vcodec libx264 -pix_fmt yuvj420p -maxrate 2048k -preset ultrafast -r 12 -framerate 1 -g 50 -crf 51 -c:a aac -b:a 128k -ar 44100 -strict experimental -video_track_timescale 100 -b:v 500k -f flv ${process.env.YOUTUBE_RTMP}`;

const ffmpeg = spawn(FFMPEG, spawnConfig.split(' '));

ffmpeg.stdout.on("data", data => console.log(`stdout: ${data}`));
ffmpeg.stderr.on("data", data => console.log(`${data}`));
ffmpeg.on("error", error => console.log(`error: ${error.message}`));
ffmpeg.on("close", code => console.log(`child process exited with code ${code}`));
