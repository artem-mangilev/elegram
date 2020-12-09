import { TestBed } from '@angular/core/testing';

import { MtprotoCoreService } from './mtproto-core.service';

describe('MtprotoCoreService', () => {
  let service: MtprotoCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtprotoCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
