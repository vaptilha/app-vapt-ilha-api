
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly supabase: SupabaseClient,
        private readonly accountsService: AccountsService,
    ) { }

    async login(dto: LoginDto) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: dto.email,
            password: dto.password,
        });

        if (error) {
            throw new UnauthorizedException(error.message);
        }

        // Check if account exists in our DB, sync if needed
        const account = await this.accountsService.createOrUpdate(data.user);

        return {
            user: account,
            token: data.session.access_token,
        };
    }

    async register(dto: RegisterDto) {
        const { data, error } = await this.supabase.auth.signUp({
            email: dto.email,
            password: dto.password,
            options: {
                data: {
                    full_name: dto.name,
                    role: dto.role,
                    whatsapp: dto.whatsapp,
                },
            },
        });

        if (error) {
            throw new BadRequestException(error.message);
        }

        if (data.user) {
            // Sync with our database immediately
            const profileData = {
                ...data.user,
                additional_info: {
                    metrics: dto.additionalInfo?.metrics,
                    riderMetrics: dto.additionalInfo?.riderMetrics,
                    whatsapp: dto.whatsapp,
                }
            };

            await this.accountsService.createOrUpdate(profileData);

            // If plan is selected, we could handle subscription creation here or let frontend do it
            // For now, return success
        }

        return {
            message: 'Registration successful',
            user: data.user,
            session: data.session, // May be null if email confirmation is required
        };
    }
}
