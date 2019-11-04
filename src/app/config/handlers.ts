import HTTPStatus from 'http-status';
import { Request, Response } from 'express';

export class Handlers {
  static onError(res: Response, message: { error: string }) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(message);
  }

  static onSuccess(res: Response, message: string) {
    return res.status(HTTPStatus.OK).json(message);
  }

  static onCreated(res: Response, message: string) {
    return res.status(HTTPStatus.CREATED).json(message);
  }

  static onBadRequest(res: Response, message: string) {
    return res.status(HTTPStatus.BAD_REQUEST).json(message);
  }

  static onBadHost(req: Request, res: Response, message: string) {
    return res.status(HTTPStatus.UNAUTHORIZED).json(message);
  }

  static onUnauthorized(req: Request, res: Response, message: string) {
    return res.status(HTTPStatus.UNAUTHORIZED).json(message);
  }
}
