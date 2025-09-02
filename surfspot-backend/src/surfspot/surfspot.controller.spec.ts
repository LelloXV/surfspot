import { Test, TestingModule } from '@nestjs/testing';
import { SurfSpotController } from './surfspot.controller';

describe('SurfspotController', () => {
  let controller: SurfSpotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurfSpotController],
    }).compile();

    controller = module.get<SurfSpotController>(SurfSpotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
