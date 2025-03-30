import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const new_user: User = new User();
    new_user.id = createUserDto.id;
    new_user.name = createUserDto.name;
    new_user.addr = createUserDto.addr;

    this.users.push(new_user);
    return this.users;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const idx = this.users.findIndex((x) => x.id == id);
    if (idx >= 0) {
      return this.users[idx];
    } else {
      return `아이디 ${id}가 존재하지 않습니다.`;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const idx = this.users.findIndex((x) => x.id == id);
    if (idx >= 0) {
      const user = this.users[idx]; // 기존 User 객체에다가 일부 수정
      user.name = updateUserDto.name;
      user.addr = updateUserDto.addr;
      return this.users;
    } else {
      return `아이디 ${id}가 존재하지 않습니다.`;
    }
  }

  remove(id: number) {
    const idx = this.users.findIndex((x) => x.id == id);
    if (idx >= 0) {
      this.users.splice(idx, 1); // splice(해당 인덱스, 1)
    } else {
      return `아이디 ${id}가 존재하지 않습니다.`;
    }
  }
}
