const errorHandler = (err, req, res, next) => {
    if (err.name === 'JsonWebTokenError') {
        res.status(401).json({ error: 'invalid token' })
    } else if ( err instanceof SyntaxError  && err.status === 400 && 'body' in err) {
        res.status(400).json({ message: 'Erro de sintaxe no JSON da requisição.'});
    } else {
        next();
    }
};

export default {
    errorHandler
};
  

