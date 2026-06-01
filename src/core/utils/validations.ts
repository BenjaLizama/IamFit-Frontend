export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPassword = (password: string): boolean => {
  if (!password) return false;
  return password.trim().length >= 6;
};

export const isValidNickname = (nickname: string): boolean => {
  if (!nickname) return false;
  return nickname.trim().length >= 3;
};
