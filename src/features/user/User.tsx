export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    authorities: Array<Authority>;
    groups?: GroupDto[];
    token: string;
    tokenExpirationDate: Date;
    active: boolean;
    displayName: string;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    userAuthType?: UserAuthType;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
}

export interface UserAuthType {
    id: number;
    value: string;
}

export interface Authority {
    name: string;
}

export interface RoleDto {
    id: number;
    name: string;
    description: string;
}

export interface GroupDto {
    id: number;
    adGroupName: string;
    email: string;
    description: string;
    roles: RoleDto[];
    lastModifiedBy: string;
    lastModifiedDate: Date;
}
