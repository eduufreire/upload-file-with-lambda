"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const handler_1 = require("./src/handler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.post("/teste", async (req, res) => {
    if (req.files?.teste) {
        const file = req.files.teste;
        const teste = file;
        try {
            const result = await (0, handler_1.handler)({
                body: teste.data
            });
            res.json(result);
        }
        catch (err) {
            console.log(err);
        }
    }
});
app.listen(3333, () => {
    console.log('server running');
});
