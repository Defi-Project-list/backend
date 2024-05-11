import { RedisClientService } from '@global'
import { Injectable, NotFoundException } from '@nestjs/common'
import { SetInput } from './join-code.input'
import { GetOutput } from './join-code.output'

export const JOIN_CODE = "joinCode"

@Injectable()
export class JoinCodeService {
  constructor(
    private readonly redisClientService: RedisClientService
  ) {

  }
  async get(): Promise<GetOutput> {
    try {
      const joinCode = await this.redisClientService.client.get(JOIN_CODE)
      return {
        joinCode
      }
    } catch (ex) {
      throw new NotFoundException("Join code not found.")
    }
  }

  async set(input: SetInput) {
    const { joinCode } = input
    await this.redisClientService.client.set(JOIN_CODE, joinCode, {
      KEEPTTL: true
    })
  }
}
