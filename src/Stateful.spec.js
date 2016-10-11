import test from 'tape';
import Stateful from './Stateful';

test( 'Stateful', t => {
  let actual, expected, stateful;

  stateful = new Stateful();

  actual = stateful.getState();
  expected = {};

  t.deepEqual( actual, expected, 'should begin with an empty state' );

  stateful.setState({ one: 1, two: 2 });
  actual = stateful.getState();
  expected = { one: 1, two: 2 };

  t.deepEqual( actual, expected, 'should set state with new properties' );


  stateful.setState({ three: 3 });
  actual = stateful.getState();
  expected = { one: 1, two: 2, three: 3 };

  t.deepEqual( actual, expected, 'should merge properties, rather than replace state' );

  stateful.setState({ three: 0 });
  actual = stateful.getState();
  expected = { one: 1, two: 2, three: 0 };

  t.deepEqual( actual, expected, 'should replace properties while merging' );

  actual = JSON.stringify( stateful );
  expected = JSON.stringify( expected );

  t.equal( actual, expected, 'should serialize its state to json' );

  t.end();
});

