
const logger = require('ournet.logger');

export { logger }

if (process.env.NODE_ENV === 'production') {
    logger.loggly({
        tags: ['top20', 'top20updater'],
        json: true
    });
    logger.removeConsole();
}
