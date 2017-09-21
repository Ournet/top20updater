'use strict';

const assert = require('assert');
const getAlexaRatings = require('../lib/alexa_ratings').getRatings;

describe('alexaRatings', function () {
    it('should fail: null host', function () {
        return getAlexaRatings().then(assert.fail).catch(assert.ok);
    });

    it('should get empty data: no host', function () {
        return getAlexaRatings('dfsdgfd.dfsgdsf')
            .then(ratings => {
                assert.ok(ratings);
                assert.equal(0, Object.keys(ratings));
            });
    });

    it('should get data: click.md', function () {
        return getAlexaRatings('click.md')
            .then(ratings => {
                assert.ok(ratings);
                assert.equal('md', ratings.AlexaCountryCode);
                assert.equal(true, Object.keys(ratings).length > 1);
            });
    });
});