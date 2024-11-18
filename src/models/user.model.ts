export interface User extends Express.User {
    id: string;
    email: string;
    name?: string;
    picture?: string;
}

export interface AuthenticatedRequest extends Express.Request {
    user?: User;
}
