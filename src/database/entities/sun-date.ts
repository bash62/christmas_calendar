import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SunDate {
  @PrimaryColumn()
  id: number;

  @Column()
  sunset: Date;

  @Column()
  sunrise: Date;
}