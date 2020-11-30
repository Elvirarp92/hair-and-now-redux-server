const checkLoggedIn = (req, res, next) =>
  req.isAuthenticated() && req.user[0].isActive == true
    ? next()
    : res
        .status(401)
        .json({
          message: 'You are not logged in, or your account is not validated',
          user: req.user,
        })

exports.checkLoggedIn = checkLoggedIn
