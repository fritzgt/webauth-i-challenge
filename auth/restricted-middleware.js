module.exports = function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (req.session && req.session.user) {
    next();
  } else {
    //if user dont provide credntials
    res.status(400).json({ message: 'Provide valid crendentials' });
  }
};
