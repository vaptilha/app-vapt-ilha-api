
import { UserRole, AccountStatus } from '../../common/enums/all.enums';

export class CreateAccountDto {
    email: string;
    passwordHash: string;
    role: UserRole;
    fullName: string;
    displayName?: string;
    documentNumber?: string;
    driverLicense?: string;
    phoneWhatsapp?: string;
}

export class UpdateAccountDto {
    fullName?: string;
    displayName?: string;
    avatarUrl?: string;
    docPhotoUrl?: string;
    phoneWhatsapp?: string;
    status?: AccountStatus;
    planId?: number;
    lat?: number;
    lng?: number;
    address?: string;
    operatingZoneIds?: number[];
}
