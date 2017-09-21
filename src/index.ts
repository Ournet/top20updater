
require('dotenv').config();

import { Ratings } from './types';
import { getRatings as getAlexaRatings } from './alexa_ratings';
import { getRatings as getYandexRatings } from './yandex_ratings';
import { setRatings, SitesEnumerator } from './data';
import { logger } from './logger';
const START_HOST = process.env.START_HOST;

function start() {
    logger.warn('START');
    const enumerator = new SitesEnumerator('md', START_HOST);

    function next() {
        return enumerator.next().then(sites => {
            if (sites.length) {
                return eachSeries(sites, site => getRatings(site.host).then(ratings => setRatings(site, ratings)).then(() => delay(6000))).then(next);
            }
        });
    }

    return next();
}

start().then(() => logger.warn('END')).catch(e => logger.error(e));

function catchError(e: Error) {
    logger.error(e);
    return {};
}

function getRatings(host: string): Promise<Ratings> {
    logger.info('getting ratings for ' + host);
    return Promise.all([getAlexaRatings(host).catch(catchError), getYandexRatings(host).catch(catchError)]).then(results => {
        return <Ratings>Object.assign.apply(Object, results);
    });
}

export function eachSeries<T>(arr: any[], iteratorFn: (item: any) => Promise<T>) {
    return arr.reduce((p, item) => p.then(() => iteratorFn(item)), Promise.resolve());
}

function delay<T>(millis: number, value?: T): Promise<T> {
    return new Promise((resolve) => setTimeout(resolve(value), millis))
}
