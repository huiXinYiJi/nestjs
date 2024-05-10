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
  ParseIntPipe,
  ValidationPipe,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';
import { Repository, MoreThan, Like, type FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  private events: Event[] = [];

  @Get()
  async findAll() {
    this.logger.log(`Hit the findAll route`);
    const events = await this.repository.find();
    this.logger.debug(`Found ${events.length} events`);
    return events;
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      select: ['id', 'createTime'], // 选取展示字段
      where: [
        {
          id: MoreThan(3),
          // AND
          // when: MoreThan(new Date('2021-02-'))
        },
        // OR
        {
          description: Like('%sdf%'),
        },
      ],
      take: 2, // limit
      order: {
        id: 'ASC',
      },
    });
  }

  @Get('/practice2')
  async practice2() {
    return await this.repository.findOne(1 as FindOneOptions<Event>);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    // const event = await this.repository.findOne({
    //   where: {
    //     id,
    //   },
    // });
    const event = await this.repository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException();
    }

    return event;
  }

  // @UsePipes()
  @Post()
  async create(
    @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
  ) {
    return await this.repository.save({
      ...input,
      // when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto,
  ) {
    const event = await this.repository.findOne(id);

    return await this.repository.save({
      ...event,
      ...input,
      // when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id) {
    const event = await this.repository.findOne(id);
    if (!event) {
      throw new NotFoundException();
    }
    await this.repository.remove(event);
  }
}
