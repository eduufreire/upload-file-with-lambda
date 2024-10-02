"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const sendFile = async (keyName, image) => {
    try {
        const client = new client_s3_1.S3Client({ region: "us-east-1" });
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
