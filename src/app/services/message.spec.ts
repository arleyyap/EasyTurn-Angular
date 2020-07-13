import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {MessageService} from './message.service'

describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });
});
