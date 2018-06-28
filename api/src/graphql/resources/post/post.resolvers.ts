import { GraphQLResolveInfo } from 'graphql'
import { Transaction } from 'sequelize';

import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { PostInstance } from '../../../models/PostModel';
export const postResolvers = {

    Post: {

        author: (post: PostInstance, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.User
                .findById(post.get('author'));
        },

        comments: (post: PostInstance, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.Comment
                .findAll({
                    where: { post: post.get('id') },
                    limit: first,
                    offset
                })
        }
    },

    Query: {

        posts: (parent, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    limit: first,
                    offset: offset
                })
        },

        post: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.Post
                .findById(id)
                .then((post: PostInstance) => {
                    if (!post) throw new Error(`post with id ${id} not found!`);
                    return post;
                })
        }

    },

    Mutation: {

        createPosts: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post.create(args.input, { transaction: t });
            })
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
        }

    }

}