"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    constructor(configService) {
        this.configService = configService;
        const { cloudName, apiKey, apiSecret } = configService.get('cloudinary');
        cloudinary_1.v2.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
        });
    }
    async uploadDocument(file, folder = 'business_documents') {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder,
                resource_type: 'auto',
                allowed_formats: ['pdf', 'png', 'jpg', 'jpeg'],
                max_file_size: 10000000,
            }, (error, result) => {
                if (error || !result)
                    return reject(error || new Error('Upload failed'));
                const response = {
                    public_id: result.public_id,
                    version: result.version,
                    signature: result.signature,
                    width: result.width,
                    height: result.height,
                    format: result.format,
                    resource_type: result.resource_type,
                    created_at: result.created_at,
                    bytes: result.bytes,
                    type: result.type,
                    url: result.url,
                    secure_url: result.secure_url,
                };
                resolve(response);
            });
            uploadStream.end(file.buffer);
        });
    }
    async deleteFile(public_id) {
        try {
            await cloudinary_1.v2.uploader.destroy(public_id);
        }
        catch (error) {
            throw new Error(`Failed to delete file: ${error.message}`);
        }
    }
};
CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map