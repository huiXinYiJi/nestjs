import { Injectable } from '@nestjs/common';
import { CreateMangerDto, TransferMoneyDto } from './dto/create-manger.dto';
import { UpdateMangerDto } from './dto/update-manger.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Manger } from './entities/manger.entity';

@Injectable()
export class MangerService {
  constructor(
    @InjectRepository(Manger) private readonly money: Repository<Manger>,
  ) {}

  create(createMangerDto: CreateMangerDto) {
    return 'This action adds a new manger';
  }

  async transferMoney(transferMoneyDto: TransferMoneyDto) {
    console.log(transferMoneyDto);
    try {
      return this.money.manager.transaction(async (manager) => {
        let from = await this.money.findOne({
          where: { id: transferMoneyDto.fromId },
        });
        let to = await this.money.findOne({
          where: { id: transferMoneyDto.toId },
        });
        // console.log(from, to);
        if (from.money >= transferMoneyDto.money) {
          manager.save(Manger, {
            id: transferMoneyDto.fromId,
            money: from.money - transferMoneyDto.money,
          });
          manager.save(Manger, {
            id: transferMoneyDto.toId,
            money: to.money + transferMoneyDto.money,
          });
          return {
            message: '转账成功',
          };
        } else {
          return {
            message: '余额不足',
          };
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  findAll() {
    return `This action returns all manger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manger`;
  }

  update(id: number, updateMangerDto: UpdateMangerDto) {
    return `This action updates a #${id} manger`;
  }

  remove(id: number) {
    return `This action removes a #${id} manger`;
  }
}
