'use strict';

var brill, assert;

brill = require('./');
assert = require('assert');

describe('brill.get(property)', function () {
    it('should return the value of an item in the database', function () {
        assert(brill.get('zoot').join('') === 'NN');
    });

    it('should return null if am item is not in the database', function () {
        assert(brill.get('unicorn') === null);
    });
});

describe('brill.has(property)', function () {
    it('should return if an item is in the database', function () {
        assert(brill.has('zoot'));
        assert(!brill.has('unicorn'));
    });

    it('should not fail on prototpe extending', function () {
        /* eslint-disable no-extend-native */
        Object.prototype.unicorn = 'mammal';

        assert(!brill.has('unicorn'));

        delete Object.prototype.unicorn;
        /* eslint-enable no-extend-native */
    });

    it('should not fail on native properties', function () {
        assert(!brill.has('toString'));
        assert(!brill.has('constructor'));
        assert(!brill.has('hasOwnProperty'));
    });
});

describe('brill.all()', function () {
    var all = brill.all();

    it('should return an object', function () {
        assert(typeof all === 'object');
    });

    it('should return all values in the datamap', function () {
        assert('zoot' in all);
        assert('zoooop' in all);
        assert('zigzags' in all);
        assert('wrecked' in all);
    });

    it('should be immutable', function () {
        all.unicorn = 'mammal';

        assert(!brill.has('unicorn'));
        assert(!('unicorn' in brill.all()));
    });
});

describe('brill.add() and brill.remove()', function () {
    it('should add and remove an item', function () {
        assert(!brill.has('unicorn'));

        brill.add('unicorn', 'mammal');
        assert(brill.has('unicorn'));

        brill.remove('unicorn');
        assert(!brill.has('unicorn'));
    });

    it('should add and remove multiple values', function () {
        assert(!brill.has('unicorn'));
        assert(!brill.has('doge'));

        brill.add({
            'unicorn' : 'mammal',
            'doge' : 'mammal'
        });
        assert(brill.has('unicorn'));
        assert(brill.has('doge'));

        brill.remove(['unicorn', 'doge']);
        assert(!brill.has('unicorn'));
        assert(!brill.has('doge'));
    });

    it('should fail silently when removing a non-existing item',
        function () {
            assert(!brill.has('unicorn'));
            brill.remove('unicorn');
            assert(!brill.has('unicorn'));
        }
    );

    it('should not fail on prototpe extending (add)', function () {
        /* eslint-disable no-extend-native */
        Object.prototype.platypus = 'mammal';

        brill.add({
            'unicorn' : 'mammal'
        });

        assert(!brill.has('platypus'));

        delete Object.prototype.platypus;
        /* eslint-enable no-extend-native */
    });
});
