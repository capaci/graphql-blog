import { makeExecutableSchema } from 'graphql-tools';

const users: any[] = [
    {
        id: 1,
        name: 'Daenarys',
        email: 'dan@westeros.com'
    },
    {
        id: 2,
        name: 'Jon',
        email: 'Jon@westeros.com'
    }
];

const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        allUsers: [User!]!
    }
`;

const resolvers = {
    Query: {
        allUsers: () => users
    }
};

export default makeExecutableSchema({typeDefs, resolvers});
