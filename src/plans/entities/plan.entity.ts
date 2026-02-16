
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { UserRole } from '../../common/enums/all.enums';

@Entity('plans')
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column('decimal', { precision: 10, scale: 2, name: 'monthly_price' })
    monthlyPrice: number;

    @Column({ default: 0, name: 'notification_delay' })
    notificationDelay: number;

    @Column({ name: 'zone_limit' })
    zoneLimit: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({
        type: 'enum',
        enum: UserRole, // Using UserRole as Plans can be for MERCHANT or RIDER
        name: 'target_role',
        default: UserRole.MERCHANT // Default to Merchant for existing seeds if any
    })
    targetRole: UserRole;
}
