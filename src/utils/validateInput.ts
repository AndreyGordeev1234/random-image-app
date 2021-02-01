export const validateInput = (input: string) => {
  return /^[a-zA-Z,\s]+$/.test(input);
};
