
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
  
  const checkAdminPermission = (role) => {
    if (role !== 'admin') {
      throw new CustomError(403, 'Você não tem permissão para executar esta ação.');
    }
  };
  

  const checkDeleteSelf = (idToDelete, idAdmin, res) => {
    if ( idAdmin === idToDelete) {
      return "error";
    }
    return null;
  };

export default {
    handleErrors,
    CustomError,
    checkAdminPermission,
    checkDeleteSelf,
};
  

