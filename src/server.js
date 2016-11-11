import express from 'express';
import db from './db';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use( cors() );
app.use( bodyParser() );
app.use( '/static', express.static( __dirname + '/../dist' ) );

app.get( '/todos', ( req, res ) => {
  db.getTodos().then( todos => res.send( todos ) );
});

app.post( '/todos', ( req, res ) => {
  const title = req.body.title;

  db.createTodo( title ).then( todo => res.send( todo ) );
});

app.delete( '/todos/:id', ( req, res ) => {
  db.rmTodo( req.params.id ).then( () => res.send({ status: 200, message: 'success' }) );
});

app.put( '/todos/:id', ( req, res ) => {
  db.changeTodo( req.params.id, req.body ).then( todo => res.send( todo ) );
});

app.get( '*', ( req, res ) => {
  res.sendFile( __dirname + '/index.html' );
});

app.listen( 3000, function () {
  console.log( 'Server is running!' );
});

