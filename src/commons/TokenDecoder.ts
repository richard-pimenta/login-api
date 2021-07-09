import { request, response } from "express"
import jwt from "jsonwebtoken"
import {hashjwt} from '../configs'

export class TokenDecoderCommon{
  private hash= hashjwt
  async verify(token, req, res){
    jwt.verify(token, this.hash,(err,decoded)=>{
      if(err){
        res.status(401)
        res.send({error:'Token Invalido'})
      }

      req.userId = decoded.id
      
    })
  }
}
