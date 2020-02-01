"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const connections = require("../../config/connection/connection");
const crypto = require("crypto");
const mongoose_1 = require("mongoose");
/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        age:
 *          type: string
 *        country:
 *          type: string
 *        gender:
 *          type: string
 *        about_me:
 *          type: string
 *        is_active:
 *          type: boolean
 *        is_admin:
 *          type: boolean
 *        passwordResetToken:
 *          type: string
 *        passwordResetExpires:
 *          type: string
 *          format: date
 *        tokens:
 *          type: array
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const UserSchema = new mongoose_1.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: String,
    country: {
        type: String,
        default: "",
    },
    age: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        default: null,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    about_me: {
        type: String,
        default: null
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    tokens: Array,
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    avata: {
        data: Buffer,
        contentType: String
    }
}, {
    collection: 'user',
    versionKey: false
}).pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this; // tslint:disable-line
        // if(user.avata) {
        //     user.avata = new Buffer(user.avata);
        // } else {
        //     user.avata = null;
        // }
        if (!user.isModified('password')) {
            return next();
        }
        try {
            const salt = yield bcrypt.genSalt(10);
            const hash = yield bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        }
        catch (error) {
            return next(error);
        }
    });
});
/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const match = yield bcrypt.compare(candidatePassword, this.password);
            return match;
        }
        catch (error) {
            return error;
        }
    });
};
/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function (size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};
exports.default = connections.db.model('UserModel', UserSchema);
//# sourceMappingURL=model.js.map