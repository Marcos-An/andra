export const RemoveSpecialCharacters = (value: string) => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/g;

  return value.replace(regex, "");
};
