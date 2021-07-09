import { NextFunction, Request, Response } from 'express';
import {
  ExpressMiddlewareInterface,
  Middleware,
} from 'routing-controllers';
import { TokenDecoderCommon } from '../commons';

// @Middleware({ type: 'before' })
export class TokenDecoder implements ExpressMiddlewareInterface{
  private tokenDecoderCommon: TokenDecoderCommon = new TokenDecoderCommon();
  async use(
  req: Request | any,
  res: Response,
  next: (err?: any) => NextFunction
): Promise<any>  {

    const auth = req.headers['authorization'];

    if (!auth) {
      res.status(401)
      res.send({error:"Miss Token"})
    }
    const parts = auth.split(' ');

    if (parts.length !== 2) {
      res.status(401);
      res.send({ error: 'Token error' });
    }
    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      res.status(401);
      res.send({ error: 'token malformatted' });
    }
    const authorization = await this.tokenDecoderCommon.verify(token, req, res);

     next();
  }
}
