import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CulturesService } from './cultures.service';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';

@Controller('cultures')
export class CulturesController {
  constructor(private readonly culturesService: CulturesService) {}

  @Post()
  create(@Body() createCultureDto: CreateCultureDto) {
    return this.culturesService.create(createCultureDto);
  }

  @Get()
  findAll() {
    return this.culturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.culturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCultureDto: UpdateCultureDto) {
    return this.culturesService.update(+id, updateCultureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.culturesService.remove(+id);
  }
}
