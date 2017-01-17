/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PomodoroRepositoryService } from './pomodoro-repository.service';

describe('PomodoroRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PomodoroRepositoryService]
    });
  });

  it('should ...', inject([PomodoroRepositoryService], (service: PomodoroRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
