export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPassword = (password: string): boolean => {
  if (!password || password.trim() === "") return false;

  const length = password.length;
  if (length < 8 || length > 64) return false;

  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/;

  return passwordRegex.test(password);
};

export const isValidNickname = (nickname: string): boolean => {
  if (!nickname) return false;
  return nickname.trim().length >= 3;
};
