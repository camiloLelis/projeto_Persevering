import Jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return Jwt.sign(
    {
      id: user.id,
      nome: user.nome,
      email: user.email,
      emailConfirmation: user.emailConfirmation,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ message: 'No Token' });
    }
    Jwt.verify(authorization, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid Token' });
        }
        req.usuario = decode;
        next();
    });
}               

export const tokenToconfirmEmail = (user) => {
  return Jwt.sign(
    {
      id: user.id,
      nome: user.nome,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

export const isAuthEmailConfirmed  = (token) => {
  if (!token) {
      return res.status(401).send({ message: 'No Token' });
  }
  let jwtDecode;
  Jwt.verify(token, process.env.JWT_SECRET , (err, decode) => {
      if (err) {
          return res.status(401).send({ message: 'Invalid Token' });
      }
    jwtDecode = decode;
  });
  console.log("jwtdecode",jwtDecode);
  return jwtDecode;  
}  