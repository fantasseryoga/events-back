import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterRequestDTO } from "src/dto/auth/register-request.dto";
import { UserEntity } from "src/infrastructure/db/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { TokenService } from "../token/token.service";
import { LoginRequestDTO } from "src/dto/auth/login-request.dto";
import { RefreshTokenDTO } from "src/dto/auth/refresh-token.dto";
import { UserResponseDTO } from "src/dto/user/user-response.dto";
import { UserNotFoundException } from "src/common/exceptions/user/user-not-found.exception";
import { UserDTO } from "src/dto/user/user.dto";
import { InvalidPasswordException } from "src/common/exceptions/auth/invalid-password.exception";
import { CityService } from "../city/city.service";
import { CityNorFoundException } from "src/common/exceptions/city/city-not-found.exception";
import { RoleService } from "../role/role.service";
import { UserRolesEnum } from "src/enums/roles/roles.enum";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
    private readonly cityService: CityService,
    private readonly roleService: RoleService,
  ) {}

  async register(model: RegisterRequestDTO): Promise<UserResponseDTO> {
    await this.checkUserForUnique(model.email);
    const refreshToken = await this.tokenService.createRefreshToken({
      email: model.email,
    });

    const city = await this.cityService.getCityById(model.cityId);
    if (!city) {
      throw new CityNorFoundException();
    }

    const userRole = await this.roleService.getRoleByName(UserRolesEnum.User);

    const newUser = this.userRepository.create({
      firstName: model.firstName,
      lastName: model.lastName,
      age: model.age,
      email: model.email,
      refreshToken,
      city: city,
      roles: [userRole],
      password: await this.hashPassword(model.password),
    });

    const savedUser = await this.userRepository.save(newUser);
    const accessToken = this.tokenService.createAccessToken({
      userId: savedUser.id.toString(),
    });

    const userShortResponse: UserResponseDTO = {
      id: savedUser.id.toString(),
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      age: savedUser.age,
      createdAt: savedUser.createdAt,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return userShortResponse;
  }

  async login(model: LoginRequestDTO): Promise<UserResponseDTO> {
    const user: UserDTO = await this.userRepository.findOne({
      where: { email: model.email },
    });

    if (!user) {
      throw new UserNotFoundException();
    }
    if (!(await bcrypt.compare(model.password, user.password))) {
      throw new InvalidPasswordException();
    }

    const accessToken = this.tokenService.createAccessToken({
      userId: user.id.toString(),
    });
    const refreshToken = await this.tokenService.createRefreshToken({
      email: model.email,
    });
    await this.updateRefreshToken(user.id.toString(), refreshToken);

    const userShortResponse: UserResponseDTO = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return userShortResponse;
  }

  async refreshToken(model: RefreshTokenDTO): Promise<UserResponseDTO> {
    const decodedRefreshToken = await this.tokenService.decodeRefreshToken(
      model.token,
    );
    const user: UserDTO = await this.userRepository.findOne({
      where: {
        email: decodedRefreshToken.email,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }
    const accessToken = this.tokenService.createAccessToken({
      userId: user.id.toString(),
    });
    const refreshToken = await this.tokenService.createRefreshToken({
      email: user.email,
    });

    await this.userRepository.update({ id: user.id }, { refreshToken });

    const userShortResponse: UserResponseDTO = {
      firstName: user.firstName,
      age: user.age,
      lastName: user.lastName,
      email: user.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return userShortResponse;
  }

  async checkUserForUnique(email: string) {
    const userExists = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ConflictException(`This email: ${email} is already taken`);
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.update({ id: userId }, { refreshToken });
  }
}
