const tokenTypes = `

    # Token definition type
    type Token {
        token: String!
    }

`;

const tokenMutations = `
    createToken(email: String!, password: String!): Token
`;

export {
    tokenTypes,
    tokenMutations
}
