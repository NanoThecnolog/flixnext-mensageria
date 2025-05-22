export interface NewAccountProps {
    name: string,
    email: string,
    birthday: Date,
    password: string
}
export interface NewAccountUserProps {
    name: string,
    email: string,
    activateLink: string,
    qrCode: string,
}

export interface ActivatedAccProps {
    name: string,
    loginLink: string,
    qrCode: string,
    email: string
}

export interface ProblemTemplateProps {
    title: string,
    description: string,
    tmdbId: number,
    season?: number,
    episode?: number,
    email: string
}

export interface RequestProps {
    tmdbId: number,
    title: string,
    subtitle?: string,
    email: string,
    userName: string
}


export interface UsersProps {
    id: string,
    name: string,
    email: string,
    birthday: Date,
    news: boolean,
    verified: boolean,
}

export interface RecoverProps {
    userName: string,
    userEmail: string,
    token: string
}