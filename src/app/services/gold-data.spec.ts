import { TestBed } from '@angular/core/testing';
import { GoldData } from './gold-data';

describe('GoldData', () => {
  let service: GoldData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoldData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
