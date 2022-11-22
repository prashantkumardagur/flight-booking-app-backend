const jwt = require('jsonwebtoken');


module.exports.authCheck = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return respondError(res, 'No token provided', 401);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    if(decoded.isAdmin) req.isAdmin = true;
    else req.isAdmin = false;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Auth failed' });
  }
}

module.exports.adminCheck = async (req, res, next) => {
  if(!req.isAdmin) return respondError(res, 'Not authorized', 401);
  next();
}