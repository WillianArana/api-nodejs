import { Request, Response } from 'express';

export abstract class BaseExeption extends Error {
  public message!: string;
  abstract handler(request: Request, response: Response): void;
}
