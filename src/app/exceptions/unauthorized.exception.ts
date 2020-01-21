import { BaseExeption } from './base-exeption';
import { Handlers } from '../shared/handlers';
import { Request, Response } from 'express';

export class UnauthorizedExeption extends BaseExeption {
  constructor(message: string) {
    super();
    this.message = message;
  }

  handler(request: Request, response: Response): void {
    Handlers.onUnauthorized(request, response, this.message);
  }
}
