import { GraphQLResolveInfo } from 'graphql'
import { Transaction } from 'sequelize';

import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { UserInstance } from '../../../models/UserModel';
export const userResolvers = {

    Query: {

        users: (parent, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.User
                .findAll({
                    limit: first,
                    offset: offset
                })
        },

        user: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.User
                .findById(id)
                .then((user: UserInstance) => {
                    if (!user) throw new Error(`user with id ${id} not found!`);
                    return user;
                })
        }

    },

    Mutation: {

        createUsers: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.User.create(args.input, { transaction: t });
            })
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
            })
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
            })
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
                            .then((user) => !!user);
                    });
            })
        }

    }

}