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
exports.RoomResponse = exports.RoomsResponse = void 0;
const Rooms_1 = require("../../entities/Rooms");
const type_graphql_1 = require("type-graphql");
const FieldError_1 = require("./matchingtypes/FieldError");
let RoomsResponse = class RoomsResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError_1.Success], { nullable: true }),
    __metadata("design:type", Array)
], RoomsResponse.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [Rooms_1.Rooms], { nullable: true }),
    __metadata("design:type", Array)
], RoomsResponse.prototype, "rooms", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], RoomsResponse.prototype, "errors", void 0);
RoomsResponse = __decorate([
    type_graphql_1.ObjectType()
], RoomsResponse);
exports.RoomsResponse = RoomsResponse;
let RoomResponse = class RoomResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError_1.Success], { nullable: true }),
    __metadata("design:type", Array)
], RoomResponse.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => Rooms_1.Rooms, { nullable: true }),
    __metadata("design:type", Rooms_1.Rooms)
], RoomResponse.prototype, "rooms", void 0);
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], RoomResponse.prototype, "errors", void 0);
RoomResponse = __decorate([
    type_graphql_1.ObjectType()
], RoomResponse);
exports.RoomResponse = RoomResponse;
//# sourceMappingURL=RoomsObject.js.map