import { Global, Module } from '@nestjs/common';
import { MongoDbModule } from './infrastructure/mongodb/mongo-db.module';
import { Neo4jModule } from './infrastructure/neo4j/neo4j.module';
import { HttpModule } from './infrastructure/http/http.module';
import { ApplicationModule } from './application/application.module';
import { EventStoreModule } from './infrastructure/event-store/event-store.module';

@Global()
@Module({
  imports: [
    ApplicationModule,
    EventStoreModule,
    HttpModule,
    MongoDbModule,
    Neo4jModule,
  ],
  exports: [ApplicationModule, MongoDbModule, Neo4jModule],
})
export class AppModule {}
