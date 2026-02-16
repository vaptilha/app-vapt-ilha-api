
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { Zone } from '../locations/entities/zone.entity';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';
import { UserRole } from '../common/enums/all.enums';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepo: Repository<Account>,
        @InjectRepository(Zone)
        private readonly zoneRepo: Repository<Zone>,
    ) { }

    async createOrUpdate(profile: any) {
        let account = await this.accountRepo.findOneBy({ email: profile.email });
        if (!account) {
            account = this.accountRepo.create({
                id: profile.id, // Use Supabase Auth UID
                email: profile.email,
                fullName: profile.user_metadata?.full_name || 'User',
                role: profile.user_metadata?.role || UserRole.MERCHANT, // Default role
                phoneWhatsapp: profile.additional_info?.whatsapp || profile.user_metadata?.whatsapp,
                additionalInfo: profile.additional_info,
                // passwordHash: 'managed-by-supabase', 
            });
        } else {
            // Sync metadata if needed
            if (profile.user_metadata?.full_name) {
                account.fullName = profile.user_metadata.full_name;
            }
            if (profile.additional_info) {
                account.additionalInfo = {
                    ...account.additionalInfo,
                    ...profile.additional_info
                };
            }
        }
        return this.accountRepo.save(account);
    }

    async getProfile(id: string) {
        const account = await this.accountRepo.findOne({
            where: { id },
            relations: ['plan', 'operatingZones'],
        });
        if (!account) throw new NotFoundException('Account not found');
        return account;
    }

    async updateProfile(id: string, dto: UpdateAccountDto) {
        const account = await this.accountRepo.findOne({
            where: { id },
            relations: ['operatingZones'],
        });
        if (!account) throw new NotFoundException('Account not found');

        if (dto.operatingZoneIds) {
            const zones = await this.zoneRepo.findByIds(dto.operatingZoneIds);
            account.operatingZones = zones;
            delete dto.operatingZoneIds; // Handled separately
        }

        Object.assign(account, dto);
        return this.accountRepo.save(account);
    }

    async getRiders() {
        return this.accountRepo.find({
            where: { role: UserRole.RIDER },
        });
    }
}
