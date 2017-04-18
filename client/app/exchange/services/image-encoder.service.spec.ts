import { TestBed, inject } from '@angular/core/testing';

import { ImageEncoderService } from './image-encoder.service';

describe('ImageEncoderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageEncoderService]
    });
  });
  
  it('should ...', inject([ImageEncoderService], (service: ImageEncoderService) => {
    expect(service).toBeTruthy();
  }));
});
