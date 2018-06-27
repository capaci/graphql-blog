const postTypes = `

    # Post definition type
    type Post {
        id: ID!
        title: String!
        content: String!
        photo: String!
        createdAt: String!
        updatedAt: String!
        author: User!
        comments: [ Comment! ]!
    }

    input PostInput {
        title: String!
        content: String!
        photo: String!
        author: Int!
    }

    input PostUpdateInput {
        title: String!
        content: String!
        photo: String!
    }

`;

const postQueries = `
    posts(first: Int, offset: Int): [ Post! ]!
    post(id: ID!): Post
`;

const postMutations = `
    createPost(input: PostCreateInput!): Post
    updatePost(id: ID!, input: PostUpdateInput!): Post
    deletePost(id: ID!): Boolean
`;

export {
    postTypes,
    postQueries,
    postMutations
}
