import { UserModel } from '../Models/User';
import mongoose = require('mongoose');
import { response } from 'express';
import bcrypt = require('bcryptjs');
import { hashjwt} from "../configs"
import jwt = require('jsonwebtoken');

export class CiadracaRepository {

  constructor(){

  }
  async cadastroUsuario(
    nome: string,
    sobrenome: string,
    usuario: string,
    senha: string
  ) {
    const newUser={
      name: nome,
      lastname: sobrenome,
      username: usuario,
      password: senha
    }
    try {
      const {username} = newUser
      if(await UserModel.findOne({ username })){
        response.status(400)
        return {error:`error, ${username} ja cadastrado`}
        }
      const user: any= await UserModel.create(newUser)

      user.password=undefined
      response.status(200)

      return ({
        user,
        token: this.gerateToken({id:user._id})
      })
    } catch (err) {
      response.status(400)
      console.log(err)
      return {eror:`usuario não cadastrado`}

    }
  }

  async authenticationUser(username:string, password:string){

    const userAuth:any = await UserModel.findOne({username}).select('+password').lean()

    if(!userAuth){
      response.status(400)
      return{Authorization:`Not Authorized`}
    }
    if(!await bcrypt.compare(password, userAuth.password)){
      response.status(400)
      return {error:`Invalid Password`}
    }
    response.status(200)
    userAuth._id= userAuth._id.toString()
    userAuth.password=undefined

     const login ={
      userAuth,
      token: this.gerateToken({id:userAuth._id})
    }
    return login
  }

  gerateToken(param:{}){
    return jwt.sign(param ,hashjwt,{
      expiresIn:86400
    })
  }
}
