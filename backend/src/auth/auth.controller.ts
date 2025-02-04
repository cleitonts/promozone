import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, ITokenPair } from './auth.service';
import { LoginRequest } from './dto/login.request';
import { ApiResponse } from 'src/common/dto/api.response';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginRequest): Promise<ApiResponse<ITokenPair>> {
    return ApiResponse.success(
      await this.authService.login(body.email, body.password),
    );
  }

  @Post('refresh')
  async refresh(
    @Body('refreshToken') refreshToken: string,
  ): Promise<ApiResponse<ITokenPair>> {
    return ApiResponse.success(
      await this.authService.refreshTokens(refreshToken),
    );
  }

  @Post('logout')
  async logout() {
    return 'success';
  }
}
