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
exports.Rooms = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Members_1 = require("./Members");
let Rooms = class Rooms extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = new Date();
        this.updatedAt = Date();
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Rooms.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], Rooms.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Rooms.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Rooms.prototype, "Roomname", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Rooms.prototype, "bilateral", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Rooms.prototype, "adminId", void 0);
__decorate([
    typeorm_1.OneToMany(() => Members_1.Members, (member) => member.room),
    __metadata("design:type", Array)
], Rooms.prototype, "rooms", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 1 }),
    __metadata("design:type", Number)
], Rooms.prototype, "members", void 0);
Rooms = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Rooms);
exports.Rooms = Rooms;
//# sourceMappingURL=Rooms.js.map