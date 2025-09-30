import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { Producer } from './entities/producer.entity';
import { ProducersService } from './producers.service';

@ApiTags('producers')
@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo produtor rural' })
  @ApiCreatedResponse({
    description: 'Produtor criado com sucesso.',
    type: Producer,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos para o cadastro.' })
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producersService.create(createProducerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os produtores rurais' })
  @ApiOkResponse({
    description: 'Lista de produtores retornada com sucesso.',
    type: [Producer],
  })
  findAll() {
    return this.producersService.findAll();
  }

  @Get(':id/farms')
  @ApiOperation({ summary: 'Busca um produtor e suas fazendas associadas' })
  @ApiParam({ name: 'id', description: 'ID do produtor (UUID)' })
  @ApiOkResponse({
    description: 'Dados do produtor e suas fazendas retornados com sucesso.',
    type: Producer,
  })
  @ApiNotFoundResponse({ description: 'Produtor não encontrado.' })
  findFarmsOfProducer(@Param('id', ParseUUIDPipe) id: string) {
    return this.producersService.findWithFarms(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um produtor pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do produtor (UUID)' })
  @ApiOkResponse({
    description: 'Dados do produtor retornados com sucesso.',
    type: Producer,
  })
  @ApiNotFoundResponse({ description: 'Produtor não encontrado.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.producersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um produtor (parcialmente)' })
  @ApiParam({ name: 'id', description: 'ID do produtor (UUID)' })
  @ApiOkResponse({
    description: 'Produtor atualizado com sucesso.',
    type: Producer,
  })
  @ApiNotFoundResponse({ description: 'Produtor não encontrado.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producersService.update(id, updateProducerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove um produtor' })
  @ApiParam({ name: 'id', description: 'ID do produtor (UUID)' })
  @ApiNoContentResponse({ description: 'Produtor removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Produtor não encontrado.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.producersService.remove(id);
  }
}
