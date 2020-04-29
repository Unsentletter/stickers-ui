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

    let getByTestId;

    beforeEach(() => {
      ({ getByTestId } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <SignupScreen />
        </MockedProvider>,
      ));
      //   fireEvent.changeText(getByTestId('messageText'), nameText);
      //   fireEvent.press(getByTestId('nameText').props.value).toEqual('');
    });

    it('initially renders an empty field', () => {
      expect(getByTestId('nameInput').props.value).toEqual('');
    });
  });
});
