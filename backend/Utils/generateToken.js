import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'unigig_jwt_secret_key_2026', {
    expiresIn: '30d'
  });
};

export default generateToken;