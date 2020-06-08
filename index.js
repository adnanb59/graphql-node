const { GraphQLServer, PubSub } = require("graphql-yoga");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const pubsub = new PubSub();

require("dotenv").config();

const typeDefs = "./src/schema.graphql";
const resolvers = require("./src/resolvers");
const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: request => {
        return {
            ...request, 
            prisma,
            pubsub
        }
    }
});

server.start({
    port: 9001,
    endpoint: "/api",
    playground: "/graphiql"
}, (options) => {
    console.log(`Server started on PORT ${options.port}\n` +
                `Playground accessed on ${options.playground}\n` +
                `API accessed on ${options.endpoint}.`);
});