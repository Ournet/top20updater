
import { Ratings } from './types';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

export async function getRatings(host: string): Promise<Ratings> {
    host = host.replace(/^www\./, '');

    const body = await fetch(`https://www.alexa.com/siteinfo/${host}`, { timeout: 1000 * 5 }).then(response => response.text());

    const $ = cheerio.load(body);

    const ratings: Ratings = {};

    const globalRank = $('.globleRank').find('.metrics-data').text();
    if (globalRank) {
        ratings.alexaRank = parseInt(globalRank.replace(/[,\. ]+/g, ''));
    }
    const countryRank = $('.countryRank').find('.metrics-data').text();
    if (countryRank) {
        ratings.alexaCountryRank = parseInt(countryRank.replace(/[,\. ]+/g, ''));
    }
    const countryRankA = $('.countryRank').find('.metrics-title a');
    if (countryRankA) {
        let countryCode = countryRankA.attr('href');
        if (countryCode) {
            countryCode = countryCode.substr(countryCode.length - 2).toLowerCase();
            ratings.alexaCountryCode = countryCode;
        }
    }

    const bounceRate = $('span[data-cat=bounce_percent]').find('.metrics-data').text();
    if (bounceRate) {
        ratings.alexaBounceRate = parseFloat(bounceRate.replace(/[, %]+/g, ''));
    }

    const pagesPerVisitor = $('span[data-cat=pageviews_per_visitor]').find('.metrics-data').text();
    if (pagesPerVisitor) {
        ratings.alexaPageviewsPerVisitor = parseFloat(pagesPerVisitor.replace(/[, %]+/g, ''));
    }

    const timeOneSite = $('span[data-cat=time_on_site]').find('.metrics-data').text();
    if (timeOneSite) {
        ratings.alexaTimeOnSite = parseFloat(timeOneSite.replace(':', '.').replace(/[, %]+/g, ''));
    }

    const search = $('span[data-cat=search_percent]').find('.metrics-data').text();
    if (search) {
        ratings.alexaSearchVisits = parseFloat(search.replace(/[, %]+/g, ''));
    }

    const backlinks = $('#linksin-panel-content').find('.box1.box1-med3').find('.font-4.box1-r').text();
    if (backlinks) {
        ratings.alexaBacklinks = parseFloat(backlinks.replace(/[, %]+/g, ''));
    }

    return ratings;
}
