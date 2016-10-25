import express from 'express';
import db from './db';
import bodyParser from 'body-parser';

const app = express();
app.use( bodyParser() );

app.get( '/', ( req, res ) => {
  res.send( 'hello' );
});

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

app.listen( 3000, function () {
  console.log( 'Server is running!' );
});

