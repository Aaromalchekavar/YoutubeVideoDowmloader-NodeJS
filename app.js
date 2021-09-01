const express = require('express');
const app = express();
const ejs = require('ejs');
const ytdl = require('ytdl-core');
const { response } = require('express');

const portno = process.env.PORT || 5000;

app.use(express.static('./partials'));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/videoInfo', async (req, res) => {
    const videoURL = req.query.videoURL;
    const info = await ytdl.getInfo(videoURL);
    res.status(200).json(info);
})

app.get('/download', (req, res) => {
    const videoURL = req.query.videoURL;
    const itag = req.query.itag;
    const format = req.query.format;
    res.header("Content-Disposition", 'attachment;\ filename="video.' + format + '"');

    ytdl(videoURL, { filter: format => format.itag == itag }).pipe(res);
})


app.listen(portno)

console.log(`app is listening at http://localhost:${portno}/`)
