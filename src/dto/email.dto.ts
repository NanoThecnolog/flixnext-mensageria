import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class NewUserDTO {
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsDate()
    birthday: Date;
    @IsString()
    password: string;
}
export class NewUserAccountDTO {
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsString()
    activateLink: string;
    @IsString()
    qrCode: string;
}

export class ActivateConfirmationDTO {
    @IsString()
    name: string
    @IsString()
    loginLink: string
    @IsString()
    qrCode: string
    @IsString()
    email: string
}

export class ProblemNotificationDTO {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsInt()
    tmdbId: number

    @IsOptional()
    @IsInt()
    season?: number

    @IsOptional()
    @IsInt()
    episode?: number

    @IsString()
    userId: string
}

export class RequestDTO {
    @IsInt()
    tmdbId: number

    @IsString()
    title: string

    @IsOptional()
    @IsString()
    subtitle?: string

    @IsString()
    userId: string

    @IsString()
    userName: string
}

export class RecoverDTO {
    @IsString()
    token: string

    @IsString()
    userName: string

    @IsString()
    userEmail: string
}