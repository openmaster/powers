const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path')
const port = 3030

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static('build'));

const converter = require('./lib/routes/fileUpload');
app.use('/api', converter);

const shareFile = require('./lib/routes/shareFile');
app.use('/api', shareFile);

app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

app.listen(process.env.PORT || port, () => console.log(`PM webmaster is listening on port ${port}!`))