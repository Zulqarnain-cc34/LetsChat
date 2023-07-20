"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifications = exports.UsersResponse = exports.UserResponse = void 0;
const User_1 = require("../../entities/User");
const type_graphql_1 = require("type-graphql");
const FieldError_1 = require("./matchingtypes/FieldError");
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError_1.Success], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
exports.UserResponse = UserResponse;
let UsersResponse = class UsersResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError_1.Success], { nullable: true }),
    __metadata("design:type", Array)
], UsersResponse.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UsersResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User], { nullable: true }),
    __metadata("design:type", Array)
], UsersResponse.prototype, "users", void 0);
UsersResponse = __decorate([
    type_graphql_1.ObjectType()
], UsersResponse);
exports.UsersResponse = UsersResponse;
let Notifications = class Notifications {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Notifications.prototype, "notifier", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Notifications.prototype, "message", void 0);
Notifications = __decorate([
    type_graphql_1.ObjectType()
], Notifications);
exports.Notifications = Notifications;
//# sourceMappingURL=UserObject.js.map