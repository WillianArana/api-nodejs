import HTTPStatus from 'http-status';
import { Request, Response } from 'express';
import { BaseExeption } from '../exceptions/base-exeption';

export class Handlers {
  static onError(res: Response, message: { error: string }): Response {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(message);
  }

  static onSuccess(res: Response, message: string | {}): Response {
    return res.status(HTTPStatus.OK).json(message);
  }

  static onCreated(res: Response, message: string): Response {
    return res.status(HTTPStatus.CREATED).json(message);
  }

  static onBadRequest(res: Response, message: string): Response {
    return res.status(HTTPStatus.BAD_REQUEST).json(message);
  }

  static onBadHost(req: Request, res: Response, message: string): Response {
    return res.status(HTTPStatus.UNAUTHORIZED).json(message);
  }

  static onUnauthorized(req: Request, res: Response, message: string): Response {
    return res.status(HTTPStatus.UNAUTHORIZED).json(message);
  }

  static onForbidden(req: Request, res: Response, message: string): Response {
    return res.status(HTTPStatus.FORBIDDEN).json(message);
  }

  static onNotFound(req: Request, res: Response, message: string): Response {
    return res.status(HTTPStatus.NOT_FOUND).json(message);
  }

  static error(req: Request, res: Response, e: any): void {
    if (e instanceof BaseExeption) {
      e.handler(req, res);
    } else {
      Handlers.onError(res, e.message);
    }
  }
}
