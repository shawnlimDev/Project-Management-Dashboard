"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const components_1 = require("../components");
const router = express_1.Router();
router.get('/', components_1.WorkspaceComponent.getAll);
exports.default = router;
//# sourceMappingURL=WorkspaceRouter.js.map