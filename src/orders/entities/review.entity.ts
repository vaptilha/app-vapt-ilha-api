
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Order } from './order.entity';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'order_id', type: 'uuid', unique: true })
    orderId: string;

    @OneToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column({ name: 'reviewer_id', type: 'uuid' })
    reviewerId: string;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'reviewer_id' })
    reviewer: Account;

    @Column({ name: 'reviewed_id', type: 'uuid' })
    reviewedId: string;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'reviewed_id' })
    reviewed: Account;

    @Column()
    score: number;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
