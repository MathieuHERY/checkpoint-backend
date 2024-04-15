import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/Countries";
import { dataSource } from "./datasource";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

async function start() {
  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  await dataSource.initialize();
  await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
  });

  console.log(`🚀 Server ready at http://localhost:4000/`);
}

start();
