export interface NewAccountProps {
    name: string,
    email: string,
    birthday: Date,
    password: string
}

export interface ProblemTemplateProps {
    title: string,
    description: string,
    tmdbId: number,
    season?: number,
    episode?: number,
    userId: string
}


export interface UsersProps {
    id: string,
    name: string,
    email: string,
    birthday: string,
    news: boolean,
    verified: boolean,
}