
import { ConnectionOptions } from 'mongoose'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer/lib/smtp-transport';
require('dotenv').config()

export const hashjwt = process.env.TOKEN
export const server = {
  port: 3000
};
export const mongoConnectionOptions : ConnectionOptions = {
  useCreateIndex:true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};
export const transport=nodemailer.createTransport(new smtpTransport({
  service: 'gmail',
  port:parseInt(process.env.PORT_NODEMAILER),
  secure:true,
  auth: {
      user:process.env._NODEMAILER,
      pass:process.env._NODEMAILER
  }

}))
