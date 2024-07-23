import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUser {
  @IsString()
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @Field(() => String)
  password: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { defaultValue: 'user' })
  role?: string;
}
