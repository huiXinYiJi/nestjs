import { Length, isDateString, isString } from 'class-validator';

export class CreateEventDto {
  // @isString()
  @Length(5, 255, {
    message: 'The name length is wrong',
  })
  name: string;
  @Length(5, 255)
  description: string;
  // @isDateString()
  when: string;
  @Length(5, 255, { groups: ['create'] })
  @Length(10, 20, { groups: ['update'] })
  address: string;
}
