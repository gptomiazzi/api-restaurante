const jwt = require('jsonwebtoken');

const loginAuth = (req, res) => {
  if (req.body.user === 'gabriel' && req.body.password === '123') {
    const token = jwt.sign({userId: 1}, process.env.SECRET, {
      expiresIn: 300
    });

    return res.status(200).json({ auth: true, accessToken: token });
  }

  return res.status(401).json({ message: 'Login inválido' });
};

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) return res.status(401).end();

    req.userId = decoded.userId;

    next();
  });
};

module.exports = {
  loginAuth,
  verifyJWT
};