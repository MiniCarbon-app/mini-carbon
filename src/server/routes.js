const handlers = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/calculate-electricity',
        handler: handlers.electricityHandler,
    },
    {
        method: 'POST',
        path: '/calculate-food',
        handler: handlers.foodHandler,
    },
    {
        method: 'POST',
        path: '/calculate-transportation',
        handler: handlers.transportationHandler,
    },
    {
        method: 'POST',
        path: '/calculate-waste',
        handler: handlers.wasteHandler,
    },
    {
        method: 'POST',
        path: '/predict',
        handler: handlers.predictHandler,
    },
];

module.exports = routes;
