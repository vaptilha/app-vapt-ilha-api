
import { SubStatus, UserRole } from '../../common/enums/all.enums';

export class CreatePlanDto {
    name: string;
    monthlyPrice: number;
    notificationDelay?: number;
    zoneLimit: number;
    targetRole: UserRole;
}

export class CreateSubscriptionDto {
    userId: string;
    planId: number;
    amountPaid: number;
    receiptUrl?: string;
}

export class UpdateSubscriptionDto {
    status?: SubStatus;
    approvedAt?: Date;
    approvedBy?: string;
    expiryDateAfterApproval?: Date;
}
