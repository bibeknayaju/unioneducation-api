export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User has been signout!");
  } catch (error) {
    next(error);
  }
};
