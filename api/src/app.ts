import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import db from './models'
import schema from './graphql/schema';
import { extractJwtMiddleware } from './middlewares/extract-jwt.middleware';

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    private middleware(): void {

        this.express.use('/graphql',

            extractJwtMiddleware(),

            (req, res, next) => {
                req['context'].db = db;
                next();
            },
            graphqlHTTP((req) => ({
                schema,
                graphiql: process.env.NODE_ENV != 'production',
                context: req['context'],
                pretty: true
            }))
        );

    }
}

export default new App().express;

