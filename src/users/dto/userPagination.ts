import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../schema/user.schema';

@ObjectType()
export class userPagination {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  totalusers: number;
}
