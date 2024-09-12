import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleEntity } from "src/infrastructure/db/entities/role.entity";
import { RoleDTO } from "src/dto/role/role.dto";
import { UserEntity } from "src/infrastructure/db/entities/user.entity";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getRoleById(id: string): Promise<RoleDTO> {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async getRoleByName(name: string): Promise<RoleDTO> {
    return await this.roleRepository.findOne({ where: { name } });
  }

  async isUserHasRole(roleName: string, userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["roles"],
    });

    if (!user) {
      return false;
    }

    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });

    if (!role) {
      return false;
    }

    return user.roles.some((userRole) => userRole.id === role.id);
  }
}
