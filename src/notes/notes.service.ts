import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'users/interfaces/user.interface';
import { Model } from 'mongoose';
import { Note } from './interfaces/note.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UsersService } from 'users/users.service';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel('Note') private readonly noteModel: Model<Note>,
        private readonly usersService: UsersService
    ) {}

    async findAll(): Promise<Note[]> {
        return await this.noteModel.find().exec();
    }

    async create( createNoteDto: CreateNoteDto): Promise<Note> {

        let newNote = new this.noteModel(createNoteDto);

        newNote = await newNote.save();

        let username = createNoteDto.username;
        const user = await this.usersService.findByUsername(username);

        const body = {$push: { notes: newNote._id }};

        await this.usersService.update(user._id, body);

        return newNote;


    }

}
