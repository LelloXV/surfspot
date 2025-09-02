import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SurfSpot } from '../surfspot/surfspot.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => SurfSpot, (spot) => spot.owner)
  spots: SurfSpot[];
}
