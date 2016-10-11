import test from 'tape';
import App from './App';
import Stateful from './Stateful';
import { createSpy } from './spy';

test( 'App', t => {
  let actual, expected, app;
  let spy = createSpy();

  app = new App();

  t.ok( app instanceof Stateful, 'should inherit from Stateful' );

  app.subscribe( spy );

  app.setState({ one: 1, two: 2 });

  t.ok( spy.called, 'should call subscribers when state is set' );

  spy.reset();
  app.unsubscribe( spy );
  app.setState({ three: 3 });
  t.notOk( spy.called, 'should remove subscribers when they are passed to unsubscribe' );

  spy.reset();
  let unsubscribe = app.subscribe( spy );

  actual = typeof unsubscribe;
  expected = 'function';
  t.equal( actual, expected, 'subscribe should return an unsubscribe function' );

  unsubscribe();
  app.setState({ four: 4 });
  t.notOk( spy.called, 'should remove subscribers when the returned function is called' );

  t.end();
});

