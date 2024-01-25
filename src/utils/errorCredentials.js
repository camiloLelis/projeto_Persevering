
const handleErrors = (err, req, res, next) => {
    console.error(err.stack);
  
    const { statusCode = 500, message = 'Erro interno do servidor' } = getErrorResponse(err);
  
    res.status(statusCode).json({ message });
  };
  
  const getErrorResponse = (err) => {
    if (err instanceof CustomError) {
      return { statusCode: err.statusCode, message: err.message };
    }
  
    return {};
  };
  
  class CustomError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  
  
  
  const checkDeleteSelf = (idToDelete, idAdmin,  role) => {
    if (role !== 'admin') {
      return { "msg": 'Você não tem permissão para executar esta ação.', "status": 403};  
    }
    if ( idAdmin == idToDelete) {
      return ({ "msg": 'impossível deletar/auterar a própria conta', "status": 401});  
    }
    return null;
  };

export default {
    handleErrors,
    CustomError,
    checkDeleteSelf
};
  

