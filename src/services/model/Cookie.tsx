export class Cookie {
    name: string;
    value: string;
    expiresOrOptions?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Lax' | 'None' | 'Strict'

    constructor(name: string, value: string, expiresOrOptions?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: "Lax" | "None" | "Strict") {
        this.name = name;
        this.value = value;
        this.expiresOrOptions = expiresOrOptions;
        this.path = path;
        this.domain = domain;
        this.secure = secure;
        this.sameSite = sameSite;
    }
}
