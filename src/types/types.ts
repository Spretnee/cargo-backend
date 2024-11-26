export interface UserEvent<T> {
    user: User;
    data: T;
}

export enum EventType {
    SUGGESTION = 'suggestion',
    USER_LOCATION = 'user-location',
    DESTINATION = 'destination',
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    ALERT = 'alert',
}

export interface User {
    id: string;
    name: string;
    image: string;
}

export interface LocationUpdate {
    latitude: number;
    longitude: number;
}
