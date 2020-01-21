import { ForbiddenExeption } from './../exceptions/forbidden.exception';
import { Handlers } from '../shared/handlers';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

@injectable()
export class AuthorizeMiddleware extends BaseMiddleware {

  public handler(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    this.authorize(req, res, next);
  }

  protected key(req: Request, res: Response): string {
    const saltKey = process.env.SALT_KEY;
    if (!saltKey) {
      Handlers.onNotFound(req, res, 'chave não encontrada');
      return '';
    }
    return saltKey;
  }

  protected authorize(req: Request, res: Response, next: NextFunction): void {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      Handlers.onUnauthorized(req, res, 'Acesso Restrito');
    }

    const saltKey = this.key(req, res);
    jwt.verify(token, saltKey, (error: any, decoded: any) => {
      if (error) {
        Handlers.onUnauthorized(req, res, 'Token Inválido');
      } else if (this.isAdmin(decoded)) {
        next();
      } else {
        this.checkPermission(req, res, next, decoded);
      }
    });
  }

  protected async checkPermission(req: Request, res: Response, next: NextFunction, decoded: any): Promise<void> {
    next();
  }

  protected hasPermission(permission: boolean, messageError = ''): boolean {
    if (!permission) {
      throw new ForbiddenExeption(messageError);
    }
    return true;
  }

  protected isAdmin(decoded: any): boolean {
    return decoded.id === 0;
  }
}
