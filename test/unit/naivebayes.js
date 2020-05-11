const test = require('tap').test;
const nb = require('../../src/extensions/scratch3_naive_bayes/NaiveBayes');

test('suma dummy', t => {
    let nbObj = new nb();
    t.equals(nbObj.sumDummy(1,2), 3);
    t.end();
});


