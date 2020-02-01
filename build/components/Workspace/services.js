"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_native_1 = require("request-promise-native");
const WorkspaceService = {
    getHeader() {
        return { 'Authorization': 'Bearer ' + process.env.ASANA_APP_TOKEN };
    },
    getAll(req, res) {
        const requestOptions = {
            method: 'GET',
            headers: this.getHeader()
        };
        const options = {
            uri: `${process.env.ASANA_API_URL}/workspaces`,
            headers: this.getHeader(),
            json: true // Automatically parses the JSON string in the response
        };
        request_promise_native_1.get(options)
            .then(function (data) {
            res.status(200).json(data);
        })
            .catch(function (err) {
            res.status(400).json({
                error: err
            });
        });
    },
};
exports.default = WorkspaceService;
//# sourceMappingURL=services.js.map