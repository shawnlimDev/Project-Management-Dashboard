"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends validation_1.default {
    /**
     * Creates an instance of UserValidation.
     * @memberof UserValidation
     */
    constructor() {
        super();
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    createUser(params) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            password: Joi.string().required(),
            gender: Joi.string(),
            age: Joi.string(),
            country: Joi.string(),
            is_active: Joi.boolean(),
            is_admin: Joi.boolean(),
            about_me: Joi.string(),
            avata: Joi.string(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });
        return Joi.validate(params, schema);
    }
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    getUser(body) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema);
    }
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    removeUser(body) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema);
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    updateUser(params) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            gender: Joi.string(),
            age: Joi.string(),
            country: Joi.string(),
            is_active: Joi.boolean(),
            is_admin: Joi.boolean(),
            about_me: Joi.string(),
            avata: Joi.string(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });
        return Joi.validate(params, schema);
    }
}
exports.default = new UserValidation();
//# sourceMappingURL=validation.js.map