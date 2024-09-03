const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const client = require('./init_redis');

module.exports = {
  signAccessToken: (user) => {
    return new Promise((resolve, reject) => {
      const payload = {
        userId: user.id,
        name: user.name,
        email: user.email
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        audience: user.id.toString(),
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (user) => {
    return new Promise((resolve, reject) => {
      const payload = {
        userId: user.id,
        name: user.name,
        email: user.email
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        audience: user.id.toString(),
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        client.SET(user.id.toString(), token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
          if (err) {
            reject(createError.InternalServerError());
            return;
          }
          resolve(token);
        });
      });
    });
  },

  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) return reject(createError.Unauthorized());
        const userId = payload.userId;
        client.GET(userId.toString(), (err, result) => {
          if (err) {
            console.log(err.message);
            reject(createError.InternalServerError());
            return;
          }
          if (refreshToken === result) return resolve(userId);
          reject(createError.Unauthorized());
        });
      });
    });
  }
};
