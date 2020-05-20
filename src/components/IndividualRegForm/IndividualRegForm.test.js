import React from 'react';
import renderer from 'react-test-renderer';
import IndividualRegForm from './IndividualRegForm';

it('renders correctly', () => {
  const tree = renderer.create(<IndividualRegForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
