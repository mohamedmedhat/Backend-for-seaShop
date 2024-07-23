import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { usersService } from './users.service';
import { User } from './schema/user.schema';
import { CreateUser } from './dto/createUser.dto';
import { userPagination } from './dto/userPagination';

@Resolver(() => User)
export class usersResolver {
  constructor(private readonly usersService: usersService) {}

  @Mutation(() => User)
  async SignUp(
    @Args('data', { type: () => CreateUser }) data: CreateUser,
  ): Promise<User> {
    return await this.usersService.signUp(data);
  }

  @Query(() => userPagination)
  async getAllUsers(
    @Args('page', { type: () => Int }) page: number,
    @Args('pageSize', { type: () => Int }) pageSize: number,
  ): Promise<userPagination> {
    const [users, totalusers] =  await this.usersService.findAllUsers(page, pageSize);
    return { users, totalusers}
  }
}
