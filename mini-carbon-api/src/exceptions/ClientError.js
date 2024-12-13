// /src/exceptions/ClientError.js

class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = 'ClientError';
        this.statusCode = statusCode; // Status HTTP, default adalah 400 (Bad Request)
    }
}

module.exports = ClientError;
