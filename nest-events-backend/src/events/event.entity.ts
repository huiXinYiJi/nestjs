import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Attendee } from './attendee.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column()
  address: string;

  @OneToMany(() => Attendee, (attendee) => attendee.event, {
    eager: true,
  })
  attendees: Attendee[];
}
