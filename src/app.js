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

app.use('/checker', (req, res)=>{
  const { query } = req
  if(query.key){
    res.append('content-type', 'application/javascript')
    res.status(200)
    res.send('
    ')
  }
  res.send('')
});

app.use('*', (req, res, next) => res.status(404).send());

module.exports = app;