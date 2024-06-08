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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = require("bcrypt");
const jwt_service_1 = require("../jwt/jwt.service");
const permission_entity_1 = require("../entities/permission.entity");
let UsersService = class UsersService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.repository = user_entity_1.UserEntity;
        this.permissionsRepository = permission_entity_1.PermissionEntity;
    }
    async createUsers(users) {
        try {
            return await this.repository.save(users);
        }
        catch (error) {
            throw new common_1.HttpException('Create product error', 500);
        }
    }
    async findUsers() {
        try {
            return await this.repository.find();
        }
        catch (error) {
            throw new common_1.HttpException('Find all products error', 500);
        }
    }
    async updateUserById(id, user) {
        const query = this.repository.createQueryBuilder('user')
            .where('user.id = :id', { id });
        const userActual = await query.getOne();
        this.repository.merge(userActual, user);
        if (!userActual) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return await this.repository.save(userActual);
    }
    async deleteUserById(id) {
        const userRemove = await this.repository.findOneBy({
            id: id
        });
        return await this.repository.remove(userRemove);
    }
    async refreshToken(refreshToken) {
        return this.jwtService.refreshToken(refreshToken);
    }
    async canDo(user, permission) {
        const result = user.permissionCodes.includes(permission);
        if (!result) {
            throw new common_1.UnauthorizedException('Usuario no autorizado.');
        }
        return true;
    }
    async register(body) {
        try {
            const user = new user_entity_1.UserEntity();
            Object.assign(user, body);
            user.password = (0, bcrypt_1.hashSync)(user.password, 10);
            await this.repository.save(user);
            return { status: 'created' };
        }
        catch (error) {
            throw new common_1.HttpException('Error de creacion', 500);
        }
    }
    async login(body) {
        const user = await this.findByEmail(body.email);
        if (user == null) {
            throw new common_1.UnauthorizedException();
        }
        const compareResult = (0, bcrypt_1.compareSync)(body.password, user.password);
        if (!compareResult) {
            throw new common_1.UnauthorizedException();
        }
        return {
            accessToken: this.jwtService.generateToken({ email: user.email }),
            refreshToken: this.jwtService.generateToken({ email: user.email }, 'refresh'),
        };
    }
    async findByEmail(email) {
        return await this.repository.findOneBy({ email });
    }
    async assignPermissionToUser(userId, body) {
        console.log(`Assigning permission with ID ${body} to user with ID ${userId}`);
        const user = await this.repository.findOne({
            where: { id: userId },
            relations: ['permissions'],
        });
        if (!user) {
            console.error(`User with ID ${userId} not found`);
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const permission = await this.permissionsRepository.findOne({ where: { id: body.permissionId } });
        if (!permission) {
            console.error(`Permission with ID ${body.permissionId} not found`);
            throw new common_1.NotFoundException(`Permission with ID ${body.permissionId} not found`);
        }
        if (!user.permissions) {
            user.permissions = [];
        }
        user.permissions.push(permission);
        await user.save();
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map