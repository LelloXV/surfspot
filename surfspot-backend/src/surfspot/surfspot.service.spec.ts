import { Test, TestingModule } from '@nestjs/testing';
import { SurfSpotService } from './surfspot.service';

describe('SurfspotService', () => {
  let service: SurfSpotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurfSpotService],
    }).compile();

    service = module.get<SurfSpotService>(SurfSpotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
