'use strict';

const assert = require('assert');
const getRatings = require('../lib/yandex_ratings').getRatings;

describe('yandexRatings', function () {
    it('should fail: null host', function () {
        return getRatings().then(assert.fail).catch(assert.ok);
    });

    it('should get empty data: no host', function () {
        return getRatings('dfsdgfd.dfsgdsf')
            .then(ratings => {
                // console.log(ratings)
                assert.ok(ratings);
                assert.equal(1, Object.keys(ratings).length);
            });
    });

    it('should get data: click.md', function () {
        return getRatings('click.md')
            .then(ratings => {
                // console.log(ratings)
                assert.ok(ratings);
                assert.ok(ratings.yandexRank);
                assert.equal(true, Object.keys(ratings).length > 0);
            });
    });
});