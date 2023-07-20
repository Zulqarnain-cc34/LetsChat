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
exports.boolResponse = void 0;
const type_graphql_1 = require("type-graphql");
const FieldError_1 = require("./FieldError");
let boolResponse = class boolResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError_1.Success], { nullable: true }),
    __metadata("design:type", Array)
], boolResponse.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], boolResponse.prototype, "updated", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], boolResponse.prototype, "errors", void 0);
boolResponse = __decorate([
    type_graphql_1.ObjectType()
], boolResponse);
exports.boolResponse = boolResponse;
//# sourceMappingURL=UpdatedResponse.js.map