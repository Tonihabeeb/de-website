import winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
];

if (isProd) {
  transports.push(
    new winston.transports.File({ filename: 'logs/app.log' })
  );
}

export const logger = winston.createLogger({
  level: isProd ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) =>
      `[${timestamp}] ${level}: ${message}`
    )
  ),
  transports,
}); 