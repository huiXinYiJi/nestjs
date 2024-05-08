import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Request,
  Headers,
  HttpCode,
  Session,
  Res,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';

// http://localhost:3000/v1/user/123
@Controller({
  path: 'user',
  // version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/add/tags')
  addTags(@Body() params: { tags: string[]; userId: number }) {
    return this.userService.addTags(params);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: { keyword: string; page: number; pageSize: number }) {
    const queryNew = {
      ...query,
      page: +query.page,
      pageSize: +query.pageSize,
    };
    return this.userService.findAll(queryNew);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // @Get('code')
  // createCode(@Req() req, @Res() res, @Session() session) {
  //   const captcha = svgCaptcha.create({
  //     size: 4, // 生成几个验证码
  //     fontSize: 50,
  //     width: 100,
  //     height: 34,
  //     background: '#cc9966',
  //   });
  //   session.code = captcha.text;
  //   res.type('image/svg+xml');
  //   res.send(captcha.data);
  // }

  // @Post('create')
  // createUser(@Body() Body, @Session() session) {
  //   // console.log(Body, session.code);
  //   if (session?.code?.toLowerCase() === Body?.code?.toLowerCase()) {
  //     return {
  //       code: 200,
  //       message: '验证码正确',
  //     };
  //   }
  //   return {
  //     code: 200,
  //     message: '验证码错误',
  //   };
  // }

  // @Post()
  // create(@Body('name') createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // // @Version('1')
  // findAll(@Request() query) {
  //   // console.log(query);
  //   return {
  //     code: 200,
  //     message: query.name,
  //   };
  //   // return this.userService.findAll();
  // }

  // @Get(':id')
  // @HttpCode(500)
  // findOne(@Param('id') id: string, @Headers() headers) {
  //   console.log(headers);
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
