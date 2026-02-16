
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@Entity('driver_tracking')
export class DriverTracking {
    @PrimaryColumn({ name: 'rider_id', type: 'uuid' })
    riderId: string;

    @OneToOne(() => Account)
    @JoinColumn({ name: 'rider_id' })
    rider: Account;

    @Column('decimal', { precision: 9, scale: 6, nullable: true, name: 'last_lat' })
    lastLat: number;

    @Column('decimal', { precision: 9, scale: 6, nullable: true, name: 'last_lng' })
    lastLng: number;

    @Column({ default: false, name: 'is_online' })
    isOnline: boolean;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
