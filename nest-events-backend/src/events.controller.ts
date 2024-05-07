import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';

@Controller('/events')
export class EventsController {
  @Get()
  findAll() {
    return [{ id: 1, name: 'First event' }];
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return id;
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    return input;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input) {
    // return input;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id) {}
}
