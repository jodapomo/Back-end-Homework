import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { getModelToken } from '@nestjs/mongoose';

describe('CatsService', () => {
  let service: CatsService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken('Cat'),
          useValue: {} 
        },
      ],
    }).compile();
    service = module.get<CatsService>(CatsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
