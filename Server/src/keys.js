module.exports = {
    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'userIOT',
        password: process.env.DATABASE_PASSWORD || 'userIOT.123',
        database: process.env.DATABASE_NAME || 'db_loggerCLOUD'
    }

};