const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;

const passwordRegex =
  /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d)[A-Za-zА-Яа-яЁё\d@$!%*?&]{6,}$/;

export const validateName = (name) => {
  if (!name.trim()) return "Field is required";
  if (!nameRegex.test(name)) return "Only letters are allowed";
  return "";
};

export const validateUsername = (username, existingUser) => {
  if (!username.trim()) return "Username is required";
  if (existingUser && existingUser.username === username.trim()) {
    return "This username is already taken";
  }
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (!passwordRegex.test(password)) {
    return "Password must be at least 6 characters and contain letters and numbers";
  }
  return "";
};
