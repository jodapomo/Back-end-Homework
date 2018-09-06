import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';

describe('Notes Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [NotesController],
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
  });
  it('should be defined', () => {
    const controller: NotesController = module.get<NotesController>(NotesController);
    expect(controller).toBeDefined();
  });
});
