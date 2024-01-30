import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class AuthRepositoryClass {
  async registerUser(user) {
    const newUser = await prisma.user.create({
      data: user,
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return newUser;
  }
  async findByUserName(username) {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  }

  async findByUserEmail(email) {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return emailExists;
  }
}

const AuthRepository = new AuthRepositoryClass();

export default AuthRepository;
