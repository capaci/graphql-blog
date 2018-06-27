import { userMutations } from "./resources/post/post.schema";

const Mutation = `
    type Mutation {
        ${userMutations}
    }
`;

export { Mutation }

