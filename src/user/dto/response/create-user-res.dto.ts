import { Exclude, Expose } from 'class-transformer';

@Expose()
export class CreateUserResDto {
  @Exclude()
  id!: string;
}
