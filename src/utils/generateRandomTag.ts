import randomWords from 'random-words';

export const generateRandomTag = () => {
  return randomWords({ maxLength: 10, exactly: 1 })[0];
};
