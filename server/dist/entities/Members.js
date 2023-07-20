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
exports.Members = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Rooms_1 = require("./Rooms");
const User_1 = require("./User");
let Members = class Members extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Members.prototype, "joined", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Members.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.memberin),
    __metadata("design:type", User_1.User)
], Members.prototype, "users", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Members.prototype, "roomId", void 0);
__decorate([
    type_graphql_1.Field(() => Rooms_1.Rooms, { nullable: true }),
    typeorm_1.ManyToOne(() => Rooms_1.Rooms, (room) => room.rooms),
    __metadata("design:type", Rooms_1.Rooms)
], Members.prototype, "room", void 0);
Members = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Members);
exports.Members = Members;
//# sourceMappingURL=Members.js.map