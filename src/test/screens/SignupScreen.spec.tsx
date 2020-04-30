import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import { MockedProvider } from '@apollo/react-testing';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import { SignupScreen, ADD_USER } from '../../screens/SignupScreen';

const mocks = [
  {
    request: {
      query: ADD_USER,
      variables: {
        name: 'Trit',
      },
    },
    result: {
      data: {
        name: 'trit',
      },
    },
  },
];

describe('SignupScreen', () => {
  describe('test', () => {
    const nameText = 'Tbag';
    const emailText = 'test@email.com';
    const passwordText = '123456';

    let getByTestId;

    beforeEach(() => {
      ({ getByTestId } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <SignupScreen />
        </MockedProvider>,
      ));
      fireEvent.changeText(getByTestId('nameInput'), '');
      fireEvent.changeText(getByTestId('emailInput'), '');
      fireEvent.changeText(getByTestId('passwordInput'), '');
      // fireEvent.press(getByTestId('nameText').props.value).toEqual('');
    });

    it('initially renders empty inputs', () => {
      expect(getByTestId('nameInput').props.value).toEqual('');
      expect(getByTestId('emailInput').props.value).toEqual('');
      expect(getByTestId('passwordInput').props.value).toEqual('');
    });
    it('should render text when name is entered', () => {
      fireEvent.changeText(getByTestId('nameInput'), nameText);
      expect(getByTestId('nameInput').props.value).toEqual('Tbag');
    });
    it('should render text when email is entered', () => {
      fireEvent.changeText(getByTestId('emailInput'), emailText);
      expect(getByTestId('emailInput').props.value).toEqual('test@email.com');
    });
    it('should render text when name is entered', () => {
      fireEvent.changeText(getByTestId('passwordInput'), passwordText);
      expect(getByTestId('passwordInput').props.value).toEqual('123456');
    });
  });
});
