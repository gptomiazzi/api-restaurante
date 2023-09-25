const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) return res.status(401).json({ message: 'Operação não autorizada!' }).end();

    req.userId = decoded.userId;

    next();
  });
};

module.exports = { verifyJWT };