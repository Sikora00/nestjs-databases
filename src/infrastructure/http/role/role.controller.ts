import { Body, Controller, Get, Post } from '@nestjs/common';
import { Neo4jService } from '@iammhc/nestjs-neo4j';
import { RoleService } from '../../../application/services/role.service';

@Controller('role')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private neo4jService: Neo4jService,
  ) {}

  @Post()
  create(@Body() data: { id: string; name: string }): Promise<any> {
    return this.roleService.create(data.id, data.name);
  }

  @Post('document')
  assignDocument(
    @Body() data: { documentId: string; roleId: string },
  ): Promise<any> {
    return this.roleService.assignDocument(data.documentId, data.roleId);
  }

  @Get()
  async test(): Promise<any> {
    const insertQuery =
      'UNWIND $pairs as pair \
             MERGE (p1:Person {name:pair[0]}) \
             MERGE (p2:Person {name:pair[1]}) \
             MERGE (p1)-[:KNOWS]-(p2)';

    const foafQuery =
      'MATCH (person:Person)-[:KNOWS]-(friend)-[:KNOWS]-(foaf) \
             WHERE person.name = $name \
              AND NOT (person)-[:KNOWS]-(foaf) \
             RETURN foaf.name AS name';

    const commonFriendsQuery =
      'MATCH (user:Person)-[:KNOWS]-(friend)-[:KNOWS]-(foaf:Person) \
             WHERE user.name = $name1 AND foaf.name = $name2 \
             RETURN friend.name AS friend';

    const connectingPathsQuery =
      'MATCH path = shortestPath((p1:Person)-[:KNOWS*..6]-(p2:Person)) \
             WHERE p1.name = $name1 AND p2.name = $name2 \
             RETURN [n IN nodes(path) | n.name] as names';

    const data = [
      ['Jim', 'Mike'],
      ['Jim', 'Billy'],
      ['Anna', 'Jim'],
      ['Anna', 'Mike'],
      ['Sally', 'Anna'],
      ['Joe', 'Sally'],
      ['Joe', 'Bob'],
      ['Bob', 'Sally'],
    ];

    await this.neo4jService.write(insertQuery, { pairs: data });
    return {
      foaf: await this.neo4jService
        .read(foafQuery, { name: 'Joe' })
        .then(results => results.records.map(record => record.get('name'))),
      commonFriends: await this.neo4jService
        .read(commonFriendsQuery, { name1: 'Joe', name2: 'Sally' })
        .then(results => results.records.map(record => record.get('friend'))),
      connections: await this.neo4jService
        .read(connectingPathsQuery, { name1: 'Joe', name2: 'Billy' })
        .then(results => results.records.map(record => record.get('names'))),
    };
  }
}
