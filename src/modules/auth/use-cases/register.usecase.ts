import { Injectable } from '@nestjs/common';
import { AuthAdapter } from '../adapters/auth.adapter';

@Injectable()
export default class RegisterUseCase {
  constructor(private readonly authAdapter: AuthAdapter) {}

  public handler() {
    return this.authAdapter.createCustomer({
      email: 'johndoe@gmail.com',
      password: '12345',
    });
  }
}
