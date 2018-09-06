import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { NotesService } from './notes.service';


describe('NotesService', () => {
  let notesService: NotesService;
  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        UsersService,
        {
          provide: getModelToken('Note'),
          useValue: {} 
        },
        {
          provide: getModelToken('User'),
          useValue: {} 
        },
      ],
    }).compile();
    
    notesService = module.get<NotesService>(NotesService);
    usersService = module.get<UsersService>(UsersService);

  });
  it('should be defined', () => {
    expect(notesService).toBeDefined();
  });
});
