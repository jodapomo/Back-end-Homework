import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { getModelToken } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { Model } from 'mongoose';

describe('Cats Controller', () => {
  let module: TestingModule;
  let catsService: CatsService;
  let catsController: CatsController;
  let catModel: Model<Cat>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: getModelToken('Cat'),
          useValue: {} 
        },
      ],
    }).compile();

    catsService = module.get<CatsService>(CatsService);
    catsController = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    const controller: CatsController = module.get<CatsController>(CatsController);
    expect(controller).toBeDefined();
  });

  it('should create a cat', async () => {
    let newCat = {
                    "name" : "Leon",
                    "age" : 8,
                    "breed" : "Desarrollador Senior"
                  };

    jest.spyOn(catsService, 'create').mockImplementation(() => newCat);

    expect(await catsController.create(newCat)).toEqual(newCat);

  });
});
