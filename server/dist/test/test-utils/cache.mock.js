"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCacheMock = void 0;
const getCacheMock = () => {
    return {
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
    };
};
exports.getCacheMock = getCacheMock;
//# sourceMappingURL=cache.mock.js.map