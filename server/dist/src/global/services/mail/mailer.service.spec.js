"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const mail_service_1 = require("./mail.service");
const config_1 = require("@nestjs/config");
const nodemailer_1 = require("nodemailer");
jest.mock('nodemailer');
describe('MailerService', () => {
    let service;
    const connectMock = jest.mocked(nodemailer_1.createTransport);
    const sendMock = jest.fn().mockResolvedValue({ response: 'mock-response' });
    beforeEach(async () => {
        connectMock.mockReturnValueOnce({
            sendMail: sendMock,
        });
        const module = await testing_1.Test.createTestingModule({
            providers: [
                mail_service_1.MailService,
                {
                    provide: config_1.ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue({
                            from: 'from-mail',
                            transportOptions: {
                                host: 'smtp-host',
                                port: 123,
                                auth: {
                                    user: 'smtp-user',
                                    pass: 'smtp-pass',
                                },
                            },
                        }),
                    },
                },
            ],
        }).compile();
        service = module.get(mail_service_1.MailService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should connect to SMTP', () => {
        const connectMock = jest.mocked(nodemailer_1.createTransport);
        expect(connectMock).toHaveBeenCalledWith({
            host: 'smtp-host',
            port: 123,
            auth: {
                user: 'smtp-user',
                pass: 'smtp-pass',
            },
        });
    });
    it('should send mail according to options', async () => {
        const sendOptions = {
            to: 'to-mail@example.com',
            from: service.from(),
            subject: 'User registered',
        };
        const mailResult = await service.send(sendOptions);
        expect(mailResult).toBe('mock-response');
        expect(sendMock).toHaveBeenCalledWith(sendOptions);
    });
    it('should return from mail', () => {
        expect(service.from()).toBe('from-mail');
    });
});
//# sourceMappingURL=mailer.service.spec.js.map