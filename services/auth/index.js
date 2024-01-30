import AuthRepository from "../../reposity/auth/index.js";
import {
  comparePasswords,
  hashPasswordUsingBcrypt,
} from "../../utils/bcrypt.js";

class AuthServiceClass {
  async registerUser(user) {
    const hashedPassword = await hashPasswordUsingBcrypt(user.password);
    const newUser = {
      ...user,
      password: hashedPassword,
    };
    const result = await AuthRepository.registerUser(newUser);
    console.log(result);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async findByUserName(username) {
    const result = await AuthRepository.findByUserName(username);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }
  async findByEmail(email) {
    const result = await AuthRepository.findByUserEmail(email);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async comparePasswords(password, user) {
    const samePassword = await comparePasswords(password, user);
    if (samePassword) {
      return { success: true, data: samePassword };
    }
    return { success: false, data: null };
  }
}

const AuthService = new AuthServiceClass();

export default AuthService;
