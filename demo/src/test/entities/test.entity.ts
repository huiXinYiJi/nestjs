import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ select: true, comment: '注释', default: '233', nullable: true })
  password: string;

  @Column()
  age: number;

  @Generated('uuid')
  uuid: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column({
    type: 'enum',
    enum: [1, 2, 3, 4],
    default: 1,
  })
  xiaoman: number;

  @Column('simple-array')
  names: string[];

  @Column('simple-json')
  json: { name: string; age: number };
}
