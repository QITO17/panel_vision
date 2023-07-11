import panelRouter from './panelRouter.js';
import infoRouter from './infoRouter.js';
import configRouter from './configRouter.js';


function routerApi(app) {

    app.use(['/index', '/'], panelRouter);
    app.use('/info', infoRouter);
    app.use('/config', configRouter);

}   

export default routerApi;