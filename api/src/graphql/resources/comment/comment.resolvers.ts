import { GraphQLResolveInfo } from 'graphql'
import { Transaction } from 'sequelize';

import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { CommentInstance } from '../../../models/CommentModel';
export const commentResolvers = {

    Comment: {

        post: (comment: CommentInstance, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.Post
                .findById(comment.get('post'));
        },

        user: (comment: CommentInstance, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.User
                .findById(comment.get('user'));
        }
    },

    Query: {

        commentByPost: (parent, { postId, first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            postId = parseInt(postId)
            return db.Comment
                .findAll({
                    where: { post: postId },
                    limit: first,
                    offset: offset
                })
        }

    },

    Mutation: {

        createComments: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment.create(args.input, { transaction: t });
            })
        },

        updateComment: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            let id = parseInt(args.id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: CommentInstance) => {
                        if (!comment) throw new Error(`comment with id ${id} not found!`);
                        return comment.update(args.input, { transaction: t });
                    });
            })
        },

        deleteComment: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            let id = parseInt(args.id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: CommentInstance) => {
                        if (!comment) throw new Error(`comment with id ${id} not found!`);
                        return comment.destroy({ transaction: t })
                            // a bug with sequelize types doesnt allow use CommentInstance as a type for destroy return
                            .then(comment => !!comment);
                    });
            })
        }

    }

}