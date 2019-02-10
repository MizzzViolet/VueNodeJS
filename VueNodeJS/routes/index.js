const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/api/v1/users', function(req, res, next) {
  let results = [];
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status.apply(500).json({success: false, data: err});
    }
    client.query('INSERT INTO USERS (name, image) VALUES ($1, $2)',
      [req.body.name, req.body.image]);
    const query = client.query('SELECT * FROM USERS');
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    })
  });
});

router.patch('/api/v1/users/:id', (req, res, next) => {
  let results = [];
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status.apply(500).json({success: false, data: err});
    }
    client.query('UPDATE USERS SET score=($1) WHERE id=($2)',
      [req.body.score, req.params.id]);
    const query = client.query('SELECT * FROM USERS');
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    })
  });
});

router.get('/api/v1/users', (req, res, next) => {
  let results = [];
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status.apply(500).json({success: false, data: err});
    }
    const query = client.query('SELECT * FROM USERS ORDER BY id ASC');
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    })
  });
});
module.exports = router;
