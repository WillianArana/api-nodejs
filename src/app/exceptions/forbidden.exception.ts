import { BaseExeption } from './base-exeption';
import { Handlers } from './../config/handlers';
import { Request, Response } from 'express';

export class ForbiddenExeption extends BaseExeption {
  constructor(message: string) {
    super();
    this.message = message;
  }

  handler(request: Request, response: Response): void {
    Handlers.onForbidden(request, response, this.message);
  }
}
