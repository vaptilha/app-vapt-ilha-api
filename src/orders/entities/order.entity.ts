
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Zone } from '../../locations/entities/zone.entity';
import { OrderStatus } from '../../common/enums/all.enums';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'merchant_id', type: 'uuid' })
    merchantId: string;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'merchant_id' })
    merchant: Account;

    @Column({ name: 'rider_id', type: 'uuid', nullable: true })
    riderId: string;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'rider_id' })
    rider: Account;

    @Column({ name: 'customer_name' })
    customerName: string;

    @Column({ name: 'origin_zone_id', nullable: true })
    originZoneId: number;

    @ManyToOne(() => Zone)
    @JoinColumn({ name: 'origin_zone_id' })
    originZone: Zone;

    @Column({ name: 'dest_zone_id', nullable: true })
    destZoneId: number;

    @ManyToOne(() => Zone)
    @JoinColumn({ name: 'dest_zone_id' })
    destZone: Zone;

    @Column({ type: 'text', nullable: true, name: 'pickup_address' })
    pickupAddress: string;

    @Column({ type: 'text', name: 'delivery_address' })
    deliveryAddress: string;

    @Column({ nullable: true, name: 'pickup_neighborhood' })
    pickupNeighborhood: string;

    @Column({ nullable: true, name: 'dropoff_neighborhood' })
    dropoffNeighborhood: string;

    @Column('decimal', { precision: 10, scale: 2, name: 'total_amount' })
    totalAmount: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'delivery_fee' })
    deliveryFee: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'rider_earnings' })
    riderEarnings: number;

    @Column({ nullable: true, name: 'payment_method' })
    paymentMethod: string;

    @Column('jsonb', { nullable: true })
    items: any;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @Column({ nullable: true, type: 'text', name: 'return_reason' })
    returnReason: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: true, name: 'return_fee' })
    returnFee: number;

    @Column({ nullable: true, name: 'proof_photo_url' })
    proofPhotoUrl: string;

    @Column({ nullable: true })
    rating: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ nullable: true, name: 'pickup_time' })
    pickupTime: Date;

    @Column({ nullable: true, name: 'dropoff_time' })
    dropoffTime: Date;

    @Column({ nullable: true, name: 'distance_text' })
    distanceText: string;

    @Column({ nullable: true, name: 'duration_text' })
    durationText: string;
}
