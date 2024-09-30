import winston from "winston";

const LoggerInstance = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [new winston.transports.Console()]
});

export default LoggerInstance;