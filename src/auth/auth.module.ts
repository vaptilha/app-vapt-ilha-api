
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { SupabaseStrategy } from './supabase.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
    imports: [ConfigModule, PassportModule, AccountsModule],
    controllers: [AuthController],
    providers: [SupabaseStrategy, AuthService],
    exports: [SupabaseStrategy, PassportModule, AuthService],
})
export class AuthModule { }
