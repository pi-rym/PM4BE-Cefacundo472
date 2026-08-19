import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { environment } from './enviroment';

const config = {
  type: 'postgres' as const,
  database: environment.dbName,
  host: environment.dbHost,
  port: environment.dbPort,
  username: environment.dbUsername,
  password: environment.dbPassword,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
  dropSchema: false, // ¡Pasar a falso en producción!
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);
