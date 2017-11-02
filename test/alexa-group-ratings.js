'use strict';

require('dotenv').config();

const assert = require('assert');
const getRatings = require('../lib/alexa_group_ratings').getRatings;

describe('alexaRatings', function () {
    it('should fail: null host', function () {
        return getRatings().then(assert.fail).catch(assert.ok);
    });

    it('should get empty data: no host', function () {
        return getRatings(['dfsdgfd.dfsgdsf'])
            .then(ratings => {
                console.log(ratings)
                assert.ok(ratings);
                assert.equal(0, Object.keys(ratings));
            });
    });

    it('should get data: click.md', function () {
        return getRatings(['click.md'])
            .then(ratings => {
                console.log(ratings)
                assert.ok(ratings);
                assert.equal('md', ratings.AlexaCountryCode);
                assert.equal(true, Object.keys(ratings).length > 1);
            });
    });
});