/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
interface CloudinaryResponse {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    bytes: number;
    type: string;
    url: string;
    secure_url: string;
}
export declare class CloudinaryService {
    private readonly configService;
    constructor(configService: ConfigService);
    uploadDocument(file: Express.Multer.File, folder?: string): Promise<CloudinaryResponse>;
    deleteFile(public_id: string): Promise<void>;
}
export {};
