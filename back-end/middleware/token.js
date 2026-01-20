const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token missing' });
  }

   const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token,'SECRET_KEY');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err } );
  }
};
