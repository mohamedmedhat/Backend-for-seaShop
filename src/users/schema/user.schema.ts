import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type userDocument = HydratedDocument<User>;

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  @Prop({ type: String, default: uuidv4, unique: true })
  id: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => String)
  @Prop()
  role: string;

  @Field(() => Date)
  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
