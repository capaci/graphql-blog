import * as express from 'express';

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    private middleware(): void {
        
        this.express.use('/hello', (req, res, next) => {
            res.send({
                hello: 'Hello World!'
            });
        });

    }
}

export default new App().express;

