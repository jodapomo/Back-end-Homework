import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue:  {}
        },
        {
          provide: getModelToken('Note'),
          useValue:{}
        },
      ],
    }).compile();
    usersService = module.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {

    it('should return all the users', async () => {

      const result = ['test']

      jest.spyOn(usersService, 'findAll').mockImplementation(() => result)

      expect(await usersService.findAll()).toBe(result)
    })

  })

  describe('findOne', () => {

    it('should return a single user by passing his id', async () => {

      const result = { 
        _id: '1a', 
        username: 'johndoe',
        name: 'John Doe', 
        notes: [{
          _id: '2b',
          text: "This is a mock",
          createdAt: "5/09/18",
          updatedAt: "5/09/18"
        }]
      }

      jest.spyOn(usersService, 'findById').mockImplementation(() => result)

      expect(await usersService.findById('1a')).toBe(result)
    })

    it('should return a single user by passing his username', async () => {

      const result = { 
        _id: '1a', 
        username: 'johndoe',
        name: 'John Doe', 
        notes: [{
          _id: '2b',
          text: "This is a mock",
          createdAt: "5/09/18",
          updatedAt: "5/09/18"
        }]
      }

      jest.spyOn(usersService, 'findByUsername').mockImplementation(() => result)

      expect(await usersService.findByUsername('johndoe')).toBe(result)
    })

  })

  describe('create', () => {

    it('should create a new user and return the created user', async () => {

      const newUser = { 
        _id: '3a', 
        username: 'johndoe',
        name: 'John Doe', 
        notes: []
      }

      jest.spyOn(usersService, 'create').mockImplementation(() => newUser)

      expect(await usersService.create(newUser)).toBe(newUser)
    })

  })

  describe('update', () => {

    it('should update an existing user and return the updated user', async () => {

      const user = { 
        _id: '4b', 
        username: 'johndoe',
        name: 'John Doe', 
        notes: []
      }

      const body: CreateUserDto = { 
        username: 'johndoe3',
        name: 'John Doe III',
        notes: []
      }

      const result = { 
          _id: '4b', 
          username: 'johndoe3',
          name: 'John Doe III', 
          notes: []
        }

      jest.spyOn(usersService, 'update').mockImplementation(() => result)

      expect(await usersService.update('4b',body)).toBe(result)
    })

  })

  describe('delete', () => {

    it('should delete an existing user and return a message', async () => {

      jest.spyOn(usersService, 'delete').mockImplementation(() => 'The user has been deleted')

      expect(await usersService.delete('3a')).toBe('The user has been deleted')
    })

  })

});
