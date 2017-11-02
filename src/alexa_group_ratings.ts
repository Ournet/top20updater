
import { Ratings } from './types';
const awis = require('awis');

const client = awis({
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY
});

export function getRatings(hosts: string[]): Promise<Ratings[]> {
    return new Promise((resolve, reject) => {
        const input: any = {
            Action: 'UrlInfo',
            'UrlInfo.Shared.ResponseGroup': 'Rank,TrafficData,RankByCountry'
        };
        hosts.forEach((host, i) => {
            input[`UrlInfo.${i + 1}.Url`] = host;
        });

        console.log(input);

        client(input, function (err: Error, data: any[]) {
            if (err) {
                return reject(err);
            }
            console.log('data', data);
            // res.length === 5 
            // data is an array with a response object for each domain 
            // data.forEach(function (item) {
            //     console.log(item.trafficData.dataUrl);
            // });
            resolve(<Ratings[]>data);
        });
    });
}
