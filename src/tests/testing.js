import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';

const changeInput = async (id, value) => {
  const input = screen.getByTestId(id).querySelector('input');
  userEvent.type(input, value);
  fireEvent.blur(input);
};

const historyMock = () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: jest.fn(),
    }),
  }));
};

export { changeInput, historyMock };
