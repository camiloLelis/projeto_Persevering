// services/UserService.js
import { getUserByIdModel } from '../models/UserModels.js';

const getUserByIdService = async (userId) => {
  console.log("teste userservice");
  const x = getUserByIdModel(userId)
  return x;
};

export default {
  getUserByIdService,
};
