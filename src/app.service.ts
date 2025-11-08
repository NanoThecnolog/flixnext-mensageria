import { BadRequestException, Injectable, InternalServerErrorException, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ActivatedAccProps, NewAccountProps, NewAccountUserProps, ProblemTemplateProps, RecoverProps, RequestProps } from '@types';

import { getAllUsers } from 'util/GetDB';
import axios from 'axios'
import { Template } from 'service/template';
import { MailService } from 'util/CreateTransporter';





@Injectable()
export class AppService {
  constructor() { }

  getActive() {
    return {
      code: 200,
      status: "Ativo",
      message: 'Mensageria rodando!'
    };
  }
}