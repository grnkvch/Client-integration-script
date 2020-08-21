const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/checker', (req, res) => {
  const { query } = req;
  if (query.key) {
    res.append('content-type', 'application/javascript');
    res.status(200);
    res.send(`
    (function(){
      function addIframe(){
        let iframe = document.createElement('iframe');
        iframe.src = 'https://someservice.netlify.app/checker';
        iframe.setAttribute('style', 'display:none;');
        document.body.appendChild(iframe);
      }
      if(document.body){
        addIframe()
      } else {
        document.addEventListener('DOMContentLoaded', addIframe)
      }
    })()
    `);

    return;
  }
  res.send('');
});

app.use('*', (req, res) => res.status(404).send());

module.exports = app;
