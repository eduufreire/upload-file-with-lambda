"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const s3_service_1 = require("./services/s3-service");
const dayjs_1 = __importDefault(require("dayjs"));
const handler = async (event) => {
    try {
        const image = Buffer.from(event.content, "base64");
        const keyFileName = `image-${Date.now()}-${(0, dayjs_1.default)().format("YYYYMMDD")}.jpg`;
        const resultFile = await (0, s3_service_1.sendFile)(keyFileName, image);
        let etag = '';
        if (resultFile?.ETag) {
            etag = resultFile?.ETag;
        }
        return {
            statusCode: 200,
            body: {
                url: `https://s3-02231002.s3.amazonaws.com/${keyFileName}`,
                eTagFile: sanitazeString(etag)
            },
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 400,
        };
    }
};
exports.handler = handler;

function sanitazeString(text) {
    return text.replace(/[^a-zA-Z0-9\s]/g, '');
}
