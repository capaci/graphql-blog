import { GraphQLResolveInfo } from 'graphql'
import { Transaction } from 'sequelize';

import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { PostInstance } from '../../../models/PostModel';
import { handleError } from '../../../utils/utils';
export const postResolvers = {

    Post: {

        author: (post: PostInstance, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.User
                .findById(post.get('author')).catch(handleError);
        },

        comments: (post: PostInstance, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.Comment
                .findAll({
                    where: { post: post.get('id') },
                    limit: first,
                    offset
                }).catch(handleError);
        }
    },

    Query: {

        posts: (parent, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    limit: first,
                    offset: offset
                }).catch(handleError);
        },

        post: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            let id = parseInt(args.id)
            return db.Post
                .findById(id)
                .then((post: PostInstance) => {
                    if (!post) throw new Error(`post with id ${id} not found!`);
                    return post;
                }).catch(handleError);
        }

    },

    Mutation: {

        createPost: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post.create(args.input, { transaction: t });
            })
            .catch(handleError);
        },

        updatePost: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            let id = parseInt(args.id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: PostInstance) => {
                        if (!post) throw new Error(`post with id ${id} not found!`);
                        return post.update(args.input, { transaction: t });
                    });
            })
            .catch(handleError);
        },

        deletePost: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            let id = parseInt(args.id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: PostInstance) => {
                        if (!post) throw new Error(`post with id ${id} not found!`);
                        return post.destroy({ transaction: t })
                            // a bug with sequelize types doesnt allow use PostInstance as a type for destroy return
                            .then(post => !!post);
                    });
            })
            .catch(handleError);
        }

    }

}