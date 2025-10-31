import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { UserDTO } from '../user/user.dto'
import type { IUserPayloadResponse, UserWithoutPassword } from './auth.interface'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { LoginInputDTO } from './dto/login.input.dto'
import { LoginResponseDto } from './dto/login.response.dto'
import { UpdateActiveTenantInputDTO } from './dto/update-active-tenant.input.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { ResolverScannerService } from './resolver-scanner.service'
import { ResolverOperationDTO } from './dto/resolver-operation.dto'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService, private scanner: ResolverScannerService) {}

  @Mutation(() => LoginResponseDto)
  async login(@Args('loginInput') input: LoginInputDTO): Promise<LoginResponseDto> {
    return this.authService.login(input.email, input.password)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserDTO)
  me(@CurrentUser() user: IUserPayloadResponse): Promise<UserWithoutPassword> {
    return this.authService.currentUser(user)
  }

  @Query(() => [ResolverOperationDTO])
  listResolvers(): ResolverOperationDTO[] {
    return this.scanner.scan()
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserDTO)
  async updateActiveTenant(
    @Args('input') input: UpdateActiveTenantInputDTO,
    @CurrentUser() user: IUserPayloadResponse
  ): Promise<UserWithoutPassword> {
    return this.authService.updateActiveTenant(user.userId, input.tenantId)
  }
}