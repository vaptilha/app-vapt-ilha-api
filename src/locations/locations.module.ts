
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Zone } from './entities/zone.entity';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';

@Module({
    imports: [TypeOrmModule.forFeature([City, Zone])],
    controllers: [LocationsController],
    providers: [LocationsService],
    exports: [TypeOrmModule, LocationsService],
})
export class LocationsModule { }
