import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  act,
} from 'react-native-testing-library';
import { MockedProvider, wait } from '@apollo/react-testing';

import { SignupScreen, ADD_USER } from '../../screens/SignupScreen';
import { signupUser } from '../../actions/AuthActions';

describe('SignupScreen', () => {
  describe('test', () => {
    const nameText = 'Tbag';
    const emailText = 'test@email.com';
    const passwordText = '123456';
    const mocks = [
      {
        request: {
          query: ADD_USER,
          variables: {
            name: 'Trit',
            email: 'test@email.com',
            password: '123456',
          },
        },
        result: {
          data: {
            name: 'trit',
            email: 'test@email.com',
            password: '123456',
          },
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupScreen />
      </MockedProvider>,
    );

    beforeEach(() => {
      fireEvent.changeText(component.getByTestId('nameInput'), '');
      fireEvent.changeText(component.getByTestId('emailInput'), '');
      fireEvent.changeText(component.getByTestId('passwordInput'), '');
      // fireEvent.press(component.getByTestId('nameText').props.value).toEqual('');
    });

    it('initially renders empty inputs', () => {
      expect(component.getByTestId('nameInput').props.value).toEqual('');
      expect(component.getByTestId('emailInput').props.value).toEqual('');
      expect(component.getByTestId('passwordInput').props.value).toEqual('');
    });
    it('should render text when name is entered', () => {
      fireEvent.changeText(component.getByTestId('nameInput'), nameText);
      expect(component.getByTestId('nameInput').props.value).toEqual('Tbag');
    });
    it('should render text when email is entered', () => {
      fireEvent.changeText(component.getByTestId('emailInput'), emailText);
      expect(component.getByTestId('emailInput').props.value).toEqual(
        'test@email.com',
      );
    });
    it('should render text when password is entered', () => {
      fireEvent.changeText(
        component.getByTestId('passwordInput'),
        passwordText,
      );
      expect(component.getByTestId('passwordInput').props.value).toEqual(
        '123456',
      );
    });
    it('should id ont know', async () => {
      const addUser = {
        name: 'Tbag',
        email: 'test@email.com',
        password: '123456',
      };

      fireEvent.changeText(component.getByTestId('nameInput'), 'Trit');
      fireEvent.changeText(
        component.getByTestId('emailInput'),
        'test@email.com',
      );
      fireEvent.changeText(component.getByTestId('passwordInput'), '123456');
      fireEvent.press(component.getByTestId('submitButton'));

      await wait(0);
      const tree = await waitForElement(() => { return component.toJSON(); });
      expect(tree.children[0].props.value).toContain('Trit');
      expect(tree.children[1].props.value).toContain('test@email.com');
      expect(tree.children[2].props.value).toContain('123456');
    });
  });
});
