export const createUserData = (username) => {
  return {
    id: Date.now(),
    firstName: username,
    lastName: "",
    username: username,
  };
};
