
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Zone } from '../locations/entities/zone.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Account, Zone])],
    controllers: [AccountsController],
    providers: [AccountsService],
    exports: [TypeOrmModule, AccountsService],
})
export class AccountsModule { }
