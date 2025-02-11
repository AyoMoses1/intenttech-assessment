/// <reference types="node" />
/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
export declare class JwtService {
    private readonly configService;
    constructor(configService: ConfigService);
    sign(payload: string | Buffer | object): string;
}
