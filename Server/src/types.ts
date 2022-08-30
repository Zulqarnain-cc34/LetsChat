import { Request, Response } from "express";
import { Redis } from "ioredis";
export type MyContext = {
    req: Request & { session: Express.Session };
    res: Response & { session: Express.Session };
    redis: Redis;
};

export interface OAuth2Types {
    web: Credentials;
}

export interface Credentials {
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_secret: string;
    redirect_uris: string[];
    javascript_origins: string[];
}
