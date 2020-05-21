var express = require('express')
var router = express.Router()
const fileParser = require('../contentProcessors/excelParser');
const {createXML, ConvertJsonToXml, ConvertXmlToJson} = require('../contentProcessors/createXml');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

router.post('/upload', function (req, res) {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, file) => {
        if (err) {
            res.send(err);
        } else {
          try {
            const data = await fileParser(file.uploadedFile.path);
            const xmlData = await createXML(data);
            res.send(xmlData);
          } catch (err){
            console.log(err);
            res.statusCode = 500;
            res.send(err);
          }
        }
    });
  })
    
  router.post('/uploadCT', function (req, res) {
    const form = formidable({ multiples: true });

    form.parse(req, async(err, fields, file) => {
        if (err) {
            res.send(err);
        } else {
          try {
            let files = [];
            let combineFileContent = {root: []};
            if(Array.isArray(file.uploadedFile))
            {
              files = file.uploadedFile;
            } else {
              files.push(file.uploadedFile);
            }
            for(let f of files) {
              const fileContent = fs.readFileSync(f.path);
              const json = await ConvertXmlToJson(fileContent);
              combineFileContent.root.push(json);
            };
            res.send(combineFileContent);
          } catch (err){
            console.log(err);
            res.statusCode = 500;
            res.send(err);
          }
        }
    });
  })

  router.post('/createXML', async function(req, res){
    res.send(await ConvertJsonToXml(req.body));
  });

  console.log('fileConverter api added');
  module.exports = router