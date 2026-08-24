import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let jwtServiceMock: Partial<JwtService>;
  let usersRepositoryMock: Partial<UsersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            getUserByEmail: jest.fn(),
            addUser: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtServiceMock = module.get<JwtService>(JwtService);
    usersRepositoryMock = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('Debe llamar a getUserByEmail y retornar token', async () => {
      (usersRepositoryMock.getUserByEmail as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'test@test.com',
        password: 'hashedPassword',
        isAdmin: false,
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      (jwtServiceMock.sign as jest.Mock).mockReturnValue('mockedToken');

      const result = await authService.signIn('test@test.com', 'password');

      expect(usersRepositoryMock.getUserByEmail).toHaveBeenCalledWith(
        'test@test.com',
      );

      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password',
        'hashedPassword',
      );

      expect(jwtServiceMock.sign).toHaveBeenCalled();

      expect(result.token).toBe('mockedToken');
    });
  });
});