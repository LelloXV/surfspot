import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('surf_spot')
export class SurfSpot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.spots)
  @JoinColumn({ name: 'user_id' })
  owner: User;
}
