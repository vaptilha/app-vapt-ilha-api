
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { UserRole, AccountStatus } from '../../common/enums/all.enums';
import { Plan } from '../../plans/entities/plan.entity';
import { Zone } from '../../locations/entities/zone.entity';

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'password_hash', select: false })
    passwordHash: string;

    @Column({
        type: 'enum',
        enum: UserRole,
    })
    role: UserRole;

    @Column({ name: 'full_name' })
    fullName: string;

    @Column({ nullable: true, name: 'display_name' })
    displayName: string;

    @Column({ nullable: true, unique: true, name: 'document_number' })
    documentNumber: string;

    @Column({ nullable: true, unique: true, name: 'driver_license' })
    driverLicense: string;

    @Column({ nullable: true, name: 'doc_photo_url' })
    docPhotoUrl: string;

    @Column({ nullable: true, name: 'phone_whatsapp' })
    phoneWhatsapp: string;

    @Column({ nullable: true, name: 'avatar_url' })
    avatarUrl: string;

    @Column({
        type: 'enum',
        enum: AccountStatus,
        default: AccountStatus.PENDING,
    })
    status: AccountStatus;

    @Column({ nullable: true, name: 'plan_id' })
    planId: number;

    @ManyToOne(() => Plan)
    @JoinColumn({ name: 'plan_id' })
    plan: Plan;

    @Column('decimal', { precision: 3, scale: 2, default: 5.0, name: 'rating_avg' })
    ratingAvg: number;

    @Column('decimal', { precision: 9, scale: 6, nullable: true })
    lat: number;

    @Column('decimal', { precision: 9, scale: 6, nullable: true })
    lng: number;

    @Column({ nullable: true, type: 'text' })
    address: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ nullable: true, name: 'expiry_date' })
    expiryDate: Date;

    @ManyToMany(() => Zone)
    @JoinTable({
        name: 'rider_zones',
        joinColumn: { name: 'rider_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'zone_id', referencedColumnName: 'id' },
    })
    operatingZones: Zone[];

    @Column({ type: 'jsonb', nullable: true, name: 'additional_info' })
    additionalInfo: any;
}
