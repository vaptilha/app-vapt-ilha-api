
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Plan } from './plan.entity';
import { Account } from '../../accounts/entities/account.entity';
import { SubStatus } from '../../common/enums/all.enums';

@Entity('subscriptions')
export class Subscription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id', type: 'uuid' })
    userId: string;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'user_id' })
    user: Account;

    @Column({ name: 'plan_id' })
    planId: number;

    @ManyToOne(() => Plan)
    @JoinColumn({ name: 'plan_id' })
    plan: Plan;

    @Column({
        type: 'enum',
        enum: SubStatus,
        default: SubStatus.AWAITING_PAYMENT,
    })
    status: SubStatus;

    @Column({ nullable: true, name: 'receipt_url' })
    receiptUrl: string;

    @Column('decimal', { precision: 10, scale: 2, name: 'amount_paid' })
    amountPaid: number;

    @CreateDateColumn({ name: 'requested_at' })
    requestedAt: Date;

    @Column({ nullable: true, name: 'approved_at' })
    approvedAt: Date;

    @Column({ nullable: true, type: 'uuid', name: 'approved_by' })
    approvedBy: string;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'approved_by' })
    approver: Account;

    @Column({ nullable: true, name: 'expiry_date_after_approval' })
    expiryDateAfterApproval: Date;
}
