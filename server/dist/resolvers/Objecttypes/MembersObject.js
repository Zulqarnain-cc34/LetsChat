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
exports.MembersResponse = exports.MemberResponse = void 0;
const type_graphql_1 = require("type-graphql");
const FieldError_1 = require("./matchingtypes/FieldError");
const Members_1 = require("../../entities/Members");
let MemberResponse = class MemberResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError_1.Success], { nullable: true }),
    __metadata("design:type", Array)
], MemberResponse.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], MemberResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Members_1.Members, { nullable: true }),
    __metadata("design:type", Members_1.Members)
], MemberResponse.prototype, "rooms", void 0);
MemberResponse = __decorate([
    type_graphql_1.ObjectType()
], MemberResponse);
exports.MemberResponse = MemberResponse;
let MembersResponse = class MembersResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError_1.Success], { nullable: true }),
    __metadata("design:type", Array)
], MembersResponse.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], MembersResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => [Members_1.Members], { nullable: true }),
    __metadata("design:type", Array)
], MembersResponse.prototype, "rooms", void 0);
MembersResponse = __decorate([
    type_graphql_1.ObjectType()
], MembersResponse);
exports.MembersResponse = MembersResponse;
//# sourceMappingURL=MembersObject.js.map