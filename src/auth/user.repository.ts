import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./auth-credential.dto";


export class UserRepository extends Repository<User> {
  constructor(@InjectRepository(User) private dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async createUser(authCredentialsDto : AuthCredentialsDto): Promise<void> {
    const {username, password} = authCredentialsDto;
    const user = this.create({username, password});
    await this.save(user);
  } 
}