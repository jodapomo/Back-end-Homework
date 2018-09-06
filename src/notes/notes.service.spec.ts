import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { NotesService } from './notes.service';


describe('NotesService', () => {
  let notesService: NotesService;
  let usersService: UsersService;
  let noteModel;

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

    noteModel = {
      find: function(responseStatus) {
          return this; 
      }
    }

  });
  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should be defined', () => {
    expect(notesService).toBeDefined();
  });

  describe('findAll', () => {

    it('should return all the notes', async () => {

      const result = ['test']

      jest.spyOn(notesService, 'findAll').mockImplementation(() => result)

      expect(await notesService.findAll()).toBe(result)
    })

  })

  describe('findOne', () => {

    it('should return a single note by passing it id', async () => {

      const result = { 
        _id: '2b',
        text: "This is a mock",
        createdAt: "5/09/18",
        updatedAt: "5/09/18"
    }

      jest.spyOn(notesService, 'findById').mockImplementation(() => result)

      expect(await notesService.findById('2b')).toBe(result)
    })

  })

  describe('create', () => {

    it('should create a new note, assign it to his user and return the created note', async () => {

      const newNoteDto = { 
        text: 'This is a mock note',
        username: 'johndoe'
      }

      const newNote = { 
        _id: '2b',
        text: 'This is a mock note',
        createdAt: '5/09/18',
        updatedAt: '5/09/18'
      }

      jest.spyOn(notesService, 'create').mockImplementation(() => newNote)

      expect(await notesService.create(newNoteDto)).toBe(newNote)
    })

  })

  describe('update', () => {

    it('should update a note by passing the id and the body of the update, return the note created', async () => {

      const note = { 
        _id: '2b',
        text: 'This is a mock note',
        createdAt: '5/09/18',
        updatedAt: '5/09/18'
      }

      const body = { 
        text: 'This is a mock note updated',
      }

      const noteUpdated = { 
        _id: '2b',
        text: 'This is a mock note updated',
        createdAt: '5/09/18',
        updatedAt: '6/09/18'
      }

      jest.spyOn(notesService, 'update').mockImplementation(() => noteUpdated)

      expect(await notesService.update('2b',body)).toBe(noteUpdated)
    })

  })

  describe('delete', () => {

    it('should delete an existing note and return a message', async () => {

      const note = { 
        _id: '2b',
        text: 'This is a mock note',
        createdAt: '5/09/18',
        updatedAt: '5/09/18'
      }

      jest.spyOn(notesService, 'delete').mockImplementation(() => 'The note has been deleted')

      expect(await notesService.delete('2b')).toBe('The note has been deleted')
    })

  })


});
