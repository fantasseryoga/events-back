import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "src/common/guard/auth.guard";
import { CityDTO } from "src/dto/city/city.dto";
import { CityCreationRequestDTO } from "src/dto/city/cty-creation-request.dto";
import { CityRoutes } from "src/enums/routes/city-routes.enum";
import { CityService } from "src/services/city/city.service";

@Controller(CityRoutes.BasePrefix)
@UsePipes(new ValidationPipe())
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @UseGuards(AuthGuard)
  @Put(CityRoutes.Set)
  async setCitiesManually(
    @Body() model: CityCreationRequestDTO,
    @Req() request,
  ): Promise<boolean> {
    const result: boolean = await this.cityService.setCitiesManually(
      model,
      request.user,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get(CityRoutes.List)
  async getCityList(): Promise<CityDTO[]> {
    const result: CityDTO[] = await this.cityService.getCityList();
    return result;
  }
}
