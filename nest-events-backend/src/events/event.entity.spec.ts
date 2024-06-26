import { Event } from './event.entity';

test('Event should be initialized through constructor', () => {
  const event = new Event({
    name: 'Interesting event',
    description: 'That was fun',
  });

  expect(event).toEqual({
    name: 'Interesting event',
    description: 'That was fun',
  });
});
