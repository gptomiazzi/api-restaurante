const jwt = require('jsonwebtoken');

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET, {
    expiresIn: 30
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN, {
    expiresIn: 3600
  })
};

const verifyTokenExpiration = (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.status(401);
  if (!refreshTokens.includes(refreshToken)) return res.status(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if(err) return res.status(403);

    const accessToken = generateAccessToken({ name: user.name });
    return res.json({ accessToken: accessToken });
  });
};

const loginAuth = (req, res) => {
  const username =  req.body.username;
  const user = { name: username };
  const password = req.body.password;

  if (username === 'gabriel' && password === '123') {
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.push(refreshToken);

    return res.status(200).json({ auth: true, accessToken: token, refreshToken: refreshToken });
  }

  return res.status(401).json({ message: 'Login inválido' });
};

const logout = (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  return res.status(204).json({ message: 'Logout efetuado com sucesso!' }).end();
};

module.exports = {
  loginAuth,
  logout,
  verifyTokenExpiration
};