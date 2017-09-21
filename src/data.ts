
const Websites = require('top20websites');
const buildRatings = require('top20rating');
import { logger } from './logger';

import { Website, Ratings } from './types';
const accessService = Websites.getAccessService();
const controlService = Websites.getControlService();

export async function setRatings(site: Website, ratings: Ratings): Promise<Website> {
    logger.warn('setting ratings for ' + site.host, ratings);
    ratings.createdAt = Math.trunc(Date.now() / 1000);

    if (site.country.toLowerCase() !== ratings.alexaCountryCode) {
        delete ratings.alexaCountryRank;
    }

    Object.keys(ratings).forEach(key => {
        if (~[null, undefined, NaN].indexOf(ratings[key])) {
            delete ratings[key];
        }
    });

    ratings.rank = buildRatings(ratings).rank;

    return await controlService.updateWebsite({ id: site.id, ratings: ratings, prevRatings: site.ratings });
}

export class SitesEnumerator {
    private pagesize = 50
    private offset = 0
    private end = false
    private passStartHost = false

    constructor(private country: string, private startHost?: string) { }

    async next(): Promise<Website[]> {
        if (this.end) {
            return [];
        }

        const list: Website[] = await accessService.websites({ where: { country: this.country, status: 'active' }, select: '_id host ratings country', offset: this.offset, limit: this.pagesize });
        if (this.startHost && !this.passStartHost && list.length) {
            const i = list.findIndex(site => site.host === this.startHost);
            if (i > -1) {
                this.passStartHost = true;
                this.offset += i;
            } else {
                this.offset += this.pagesize;
            }
            return this.next();
        }
        this.offset += this.pagesize;
        if (list.length < this.pagesize) {
            this.end = true;
        }

        return list;
    }
}
