"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const pino_1 = __importDefault(require("pino"));
const sendFile = async (keyName, image) => {
    try {
        const client = new client_s3_1.S3Client({ region: "us-east-1" });
        const logger = (0, pino_1.default)({ level: 'info' });
        logger.info("ooooooi");
        const input = {
            Body: image,
            Bucket: "s3-02231002",
            Key: keyName,
        };
        const command = new client_s3_1.PutObjectCommand(input);
        const result = await client.send(command);
        if (result) {
            return result;
        }
    }
    catch (err) {
        throw new Error("Erro ao tentar enviar imagem ao S3");
    }
};
exports.sendFile = sendFile;
