
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Unique } from 'typeorm';
import { City } from './city.entity';

@Entity('zones')
@Unique(['city', 'name'])
export class Zone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'city_id' })
    cityId: number;

    @ManyToOne(() => City, (city) => city.zones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'city_id' })
    city: City;

    @Column({ nullable: true })
    name: string;

    @Column('decimal', { precision: 10, scale: 6, nullable: true })
    lat: number;

    @Column('decimal', { precision: 10, scale: 6, nullable: true })
    lng: number;

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
