
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverTracking } from './entities/driver-tracking.entity';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';

@Module({
    imports: [TypeOrmModule.forFeature([DriverTracking])],
    controllers: [TrackingController],
    providers: [TrackingService],
    exports: [TypeOrmModule, TrackingService],
})
export class TrackingModule { }
