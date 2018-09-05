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

    @Get('/:id')
    public async getUser(@Response() res, @Param() param){
        const user = await this.usersService.findById(param.id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Get('/username/:username')
    public async getUserByUsername(@Response() res, @Param() param){
        const user = await this.usersService.findByUsername(param.username);
        return res.status(HttpStatus.OK).json(user);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createUser(@Response() res, @Body() createUserDto: CreateUserDto) {

        const user = await this.usersService.create(createUserDto);
        return res.status(HttpStatus.CREATED).json(user);
    }

    @Patch('/:id')
    public async updateUser(@Param() param, @Response() res, @Body() body) {

        const todo = await this.usersService.update(param.id, body);
        return res.status(HttpStatus.OK).json(todo);
    }

    @Delete('/:id')
    public async deleteUser(@Param() param, @Response() res) {

        const todo = await this.usersService.delete(param.id);
        return res.status(HttpStatus.OK).json(todo);
    }
}
