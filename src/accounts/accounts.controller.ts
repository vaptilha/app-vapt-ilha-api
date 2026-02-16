
import { Controller, Get, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/account.dto';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard';
import { SupabaseClient } from '@supabase/supabase-js';

@Controller('accounts')
export class AccountsController {
    constructor(
        private readonly accountsService: AccountsService,
        private readonly supabase: SupabaseClient,
    ) { }

    @UseGuards(SupabaseAuthGuard)
    @Get('me')
    async getProfile(@Req() req: any) {
        return this.accountsService.getProfile(req.user.sub);
    }

    @UseGuards(SupabaseAuthGuard)
    @Patch('me')
    async updateProfile(@Req() req: any, @Body() dto: UpdateAccountDto) {
        return this.accountsService.updateProfile(req.user.sub, dto);
    }

    // Webhook or Client-side trigger to sync user
    @UseGuards(SupabaseAuthGuard)
    @Post('sync')
    async syncAccount(@Req() req: any) {
        // Fetch latest user data from Supabase Auth to ensure freshness
        const { data: { user } } = await this.supabase.auth.admin.getUserById(req.user.sub);
        return this.accountsService.createOrUpdate(user || req.user);
    }

    // Admin route
    @UseGuards(SupabaseAuthGuard)
    @Get('riders')
    async getRiders() {
        return this.accountsService.getRiders();
    }
}
