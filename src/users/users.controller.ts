import { Controller, Get, Body, Response, Post, Patch, Delete, Param, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @ApiOperation({ title: 'Get all users', description: "Return a json with all the users" })
    @Get()
    public async getUsers(@Response() res) {
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @ApiOperation({ title: 'Get an user by id', description: "Return a user by passing the _id." })
    @Get('/:id')
    public async getUser(@Response() res, @Param() param){
        const user = await this.usersService.findById(param.id);
        return res.status(HttpStatus.OK).json(user);
    }

    @ApiOperation({ title: 'Get an user by username', description: "Return a user by passing the username." })
    @Get('/username/:username')
    public async getUserByUsername(@Response() res, @Param() param){
        const user = await this.usersService.findByUsername(param.username);
        return res.status(HttpStatus.OK).json(user);
    }

    @ApiOperation({ title: 'Create an user', description: "Create an user passing a object of type CreateUserDto. Return the object created" })
    @Post()
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createUser(@Response() res, @Body() createUserDto: CreateUserDto) {

        const user = await this.usersService.create(createUserDto);
        return res.status(HttpStatus.CREATED).json(user);
    }

    @ApiOperation({ title: 'Update an user passing his _id.', description: "Update an user passing a body with changs. Look for mongoose update." })
    @Patch('/:id')
    public async updateUser(@Param() param, @Response() res, @Body() body) {

        const user = await this.usersService.update(param.id, body);
        return res.status(HttpStatus.OK).json(user);
    }

    @ApiOperation({ title: 'Delete an user passing his _id.', description: "Delete an user passing his id." })
    @Delete('/:id')
    public async deleteUser(@Param() param, @Response() res) {

        const user = await this.usersService.delete(param.id);
        return res.status(HttpStatus.OK).json(user);
    }
}
