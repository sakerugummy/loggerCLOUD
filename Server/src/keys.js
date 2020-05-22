module.exports = {
    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || '206.189.201.180',
        user: process.env.DATABASE_USER || 'admin',
        password: process.env.DATABASE_PASSWORD || 't1sk04DM1N.2040',
        database: process.env.DATABASE_NAME || 'db_loggerCLOUD'
    }

};