import { Controller, Get, Response, HttpStatus, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@ApiUseTags('notes')
@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService){}

    @ApiOperation({ title: 'Get all notes', description: "Return a jsons array with all the notes" })
    @Get()
    public async getNotes(@Response() res) {
        const notes = await this.notesService.findAll();
        return res.status(HttpStatus.OK).json(notes);
    }

    @Get('/:id')
    public async getNote(@Response() res, @Param() param){
        const note = await this.notesService.findById(param.id);
        return res.status(HttpStatus.OK).json(note);
    }

    // @Get('/username/:username')
    // public async getUserByUsername(@Response() res, @Param() param){
    //     const user = await this.usersService.findByUsername(param.username);
    //     return res.status(HttpStatus.OK).json(user);
    // }

    @Post()
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createNote( @Response() res, @Body() createNoteDto: CreateNoteDto ) {

        const note = await this.notesService.create(createNoteDto);

        return res.status(HttpStatus.CREATED).json(note);
    }

    @Patch('/:id')
    public async updateNote(@Param() param, @Response() res, @Body() body) {

        const todo = await this.notesService.update(param.id, body);
        return res.status(HttpStatus.OK).json(todo);
    }

    @Delete('/:id')
    public async deleteNote(@Param() param, @Response() res) {

        const todo = await this.notesService.delete(param.id);
        return res.status(HttpStatus.OK).json(todo);
    }
}
