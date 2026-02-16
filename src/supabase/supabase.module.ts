
import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: SupabaseClient,
            useFactory: (configService: ConfigService) => {
                return createClient(
                    configService.get('SUPABASE_URL') || '',
                    configService.get('SUPABASE_KEY') || '',
                );
            },
            inject: [ConfigService],
        },
    ],
    exports: [SupabaseClient],
})
export class SupabaseModule { }
