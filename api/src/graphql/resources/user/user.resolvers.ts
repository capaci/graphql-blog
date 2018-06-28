import { GraphQLResolveInfo } from 'graphql'
import { Transaction } from 'sequelize';

import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { UserInstance } from '../../../models/UserModel';
import { handleError } from '../../../utils/utils';

export const userResolvers = {

    User: {

        posts: (user: UserInstance, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    where: { author: user.get('id') },
                    limit: first,
                    offset
                })
                .catch(handleError);
        }
    },

    Query: {

        users: (parent, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.User
                .findAll({
                    limit: first,
                    offset: offset
                })
                .catch(handleError);
        },

        user: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.User
                .findById(id)
                .then((user: UserInstance) => {
                    if (!user) throw new Error(`user with id ${id} not found!`);
                    return user;
                })
                .catch(handleError);
        }

    },

    Mutation: {

        createUsers: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.User.create(args.input, { transaction: t });
            }).catch(handleError);
        },

        updateUser: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            let id = parseInt(args.id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if (!user) throw new Error(`user with id ${id} not found!`);
                        return user.update(args.input, { transaction: t });
                    });
            }).catch(handleError);
        },

        updateUserPassword: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            let id = parseInt(args.id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if (!user) throw new Error(`user with id ${id} not found!`);
                        return user.update(args.input, { transaction: t })
                            .then((user: UserInstance) => !!user);
                    });
            }).catch(handleError);
        },

        deleteUser: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            let id = parseInt(args.id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if (!user) throw new Error(`user with id ${id} not found!`);
                        return user.destroy({ transaction: t })
                            // a bug with sequelize types doesnt allow use UserInstance as a type for destroy return
                            .then(user => !!user);
                    });
            }).catch(handleError);
        }

    }

}