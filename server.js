const express = require('express');
const moment = require('moment');
const app = express();

app.set('port', process.env.PORT || 8000);

app.param('time', (req, res, next, time) => {
  let parsedTime = moment(isNaN(+time) ? time : +time * 1000);

  if (parsedTime.isValid()) {
    req.unix = parsedTime.unix();
    req.natural = parsedTime.format('LL');
  } else {
    req.unix = null;
    req.natural = null;
  }

  next();
});

app.get('/:time', (req, res) => {
  const { unix, natural } = req;

  console.log('received ' + req.params.time);
  console.log(`parsed: ${natural} (${unix})`);

  res.send({ unix, natural });
});

app.listen(app.get('port'), () => {
  console.log(`Server up and running on port ${app.get('port')}...`);
});
