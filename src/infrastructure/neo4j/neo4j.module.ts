import { Module } from '@nestjs/common';
import { Neo4jModule as LibNeo4jModule } from '@iammhc/nestjs-neo4j';

@Module({
  imports: [
    LibNeo4jModule.forRoot({
      host: 'localhost',
      password: '1234',
      port: 7687,
      scheme: 'bolt',
      username: 'neo4j',
    }),
  ],
  exports: [LibNeo4jModule],
})
export class Neo4jModule {}
