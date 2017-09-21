
import { Ratings } from './types';
import fetch from 'node-fetch';

export async function getRatings(host: string): Promise<Ratings> {
    host = host.replace(/^www\./, '');

    const body = await fetch(`http://bar-navig.yandex.ru/u?show=31&url=http://${host}`, { timeout: 1000 * 5 }).then(response => response.text());

    const result = /tcy\s+rang="\d+" value="(\d+)"/.exec(body);

    const ratings: Ratings = {};

    if (result) {
        ratings.yandexRank = parseInt(result[1]);
    }

    return ratings;
}
