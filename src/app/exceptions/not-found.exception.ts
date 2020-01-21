import { BaseExeption } from './base-exeption';
import { Handlers } from '../shared/handlers';
import { Request, Response } from 'express';

export class NotFoundExeption extends BaseExeption {
  constructor(message: string) {
    super();
    this.message = message;
  }

  handler(request: Request, response: Response): void {
    Handlers.onNotFound(request, response, this.message);
  }
}
