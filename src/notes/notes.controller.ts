import { Controller, Get, Response, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@ApiUseTags('notes')
@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService){}

    @ApiOperation({ title: 'Get all users', description: "Return a json with all the users" })
    @Get()
    public async getNotes(@Response() res) {
        const notes = await this.notesService.findAll();
        return res.status(HttpStatus.OK).json(notes);
    }

    // @Get('find')
    // public async findUser(@Response() res, @Body() body) {
    //     const queryCondition = body;
    //     const users = await this.usersService.findOne(queryCondition);
    //     return res.status(HttpStatus.OK).json(users);
    // }

    // @Get('/:id')
    // public async getUser(@Response() res, @Param() param){
    //     const user = await this.usersService.findById(param.id);
    //     return res.status(HttpStatus.OK).json(user);
    // }

    // @Get('/username/:username')
    // public async getUserByUsername(@Response() res, @Param() param){
    //     const user = await this.usersService.findByUsername(param.username);
    //     return res.status(HttpStatus.OK).json(user);
    // }

    @Post()
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createUser( @Response() res, @Body() createNoteDto: CreateNoteDto) {

        const note = await this.notesService.create(createNoteDto);

        return res.status(HttpStatus.CREATED).json(note);
    }

    // @Patch('/:id')
    // public async updateTodo(@Param() param, @Response() res, @Body() body) {

    //     const todo = await this.usersService.update(param.id, body);
    //     return res.status(HttpStatus.OK).json(todo);
    // }

    // @Delete('/:id')
    // public async deleteTodo(@Param() param, @Response() res) {

    //     const todo = await this.usersService.delete(param.id);
    //     return res.status(HttpStatus.OK).json(todo);
    // }
}
