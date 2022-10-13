"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
app.listen(port, () => {
    console.log(`server running on port ${port}...`);
});
//# sourceMappingURL=app.js.map