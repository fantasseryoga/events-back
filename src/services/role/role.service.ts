import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleEntity } from "src/infrastructure/db/entities/role.entity";
import { RoleDTO } from "src/dto/role/role.dto";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async getRoleById(id: string): Promise<RoleDTO> {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async getRoleByName(name: string): Promise<RoleDTO> {
    return await this.roleRepository.findOne({ where: { name } });
  }
}
