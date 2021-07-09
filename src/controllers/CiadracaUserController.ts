import {
  BodyParam,
  Get,
  JsonController,
  Param,
  Post,
  UseAfter,
  UseBefore,
  Req,
} from 'routing-controllers';
import { Request } from 'express'
import { CiadracaService } from '../service/Index';
import {TokenDecoder} from "../middlewares"

@JsonController()
export class CiadracaController {

  private ciadracaService: CiadracaService = new CiadracaService();

  constructor() {}

  @Post('/ciadraca/register')
  async registerUser(
    @BodyParam('name') name: string,
    @BodyParam('lastname') lastname: string,
    @BodyParam('username') username: string,
    @BodyParam('password') password: string
  ): Promise<any> {
    return this.ciadracaService.cadastrarUsuario(
      name,
      lastname,
      username,
      password
    );
  }

  @Get('/ciadraca/auth')
  async authenticationUser(
    @BodyParam('username') username: string,
    @BodyParam('password') password: string
  ): Promise<any> {
    console.log(username, password)
    return  this.ciadracaService.authenticationUser(username,password)
  }

  @Get("/ciadraca/teste")
  @UseBefore(TokenDecoder)
  async teste(
    @Req() req: Request | any
  ){
    console.log(req.userId)
    return {ok:true, user:req.userId}
  }
}
