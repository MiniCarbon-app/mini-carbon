const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const startServer = async () => {
    try {
        const server = Hapi.server({
            port: process.env.PORT || 8080,
            host: 'localhost',
            routes: {
                cors: {
                    origin: ['*'],
                },
            },
        });

        server.route(routes);

        await server.start();
        console.log(`Server berjalan di: ${server.info.uri}`);
    } catch (err) {
        if (err.code === 'EADDRINUSE') {
            console.error('Port 8080 sudah digunakan. Silakan gunakan port lain.');
        } else {
            console.error('Error saat memulai server:', err.message);
        }
        process.exit(1);
    }
};

startServer();
