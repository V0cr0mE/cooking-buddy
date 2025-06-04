import { TestBed } from '@angular/core/testing';

import { Recipes } from './recipes.service';

describe('Recipes', () => {
  let service: Recipes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Recipes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
