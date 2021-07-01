const test = require('tap').test;
const NaiveBayes = require('../../../src/extensions/scratch3_naive_bayes/naive-bayes');
const Model = require('../../../src/extensions/scratch3_naive_bayes/model');
const MockInputsNaiveBayes = require('./mock_inputs');

test('teo Bayes', teoBayesTest => {
    var naiveBayes = new NaiveBayes();
    naiveBayes.initModel('emocion');
    naiveBayes.train('alegria', MockInputsNaiveBayes.getArrayHappyExamples(), MockInputsNaiveBayes.getLengthArrayHappy());
    naiveBayes.train('tristeza', MockInputsNaiveBayes.getArraySadExamples(), MockInputsNaiveBayes.getLengthArraySad());

    var newValue = 'eres malvado conmigo';

    var happyResultTeoBayes = naiveBayes.teoBayes('alegria', newValue);
    teoBayesTest.equals(happyResultTeoBayes, 0.0008333333333333334);

    var sadResultTeoBayes = naiveBayes.teoBayes('tristeza', newValue);
    teoBayesTest.equals(sadResultTeoBayes, 0.001220703125);

    teoBayesTest.test('when category not trained', categoryNotTrained =>{
        var fooResultTeoBayes = naiveBayes.teoBayes('foobar', newValue);
        categoryNotTrained.equals(fooResultTeoBayes, 0);

        var numResultTeoBayes = naiveBayes.teoBayes(123456, newValue);
        categoryNotTrained.equals(numResultTeoBayes, 0);

        categoryNotTrained.end();
    });


    var otherValue = 'lo hiciste increible';

    var otherHappyResultTeoBayes = naiveBayes.teoBayes('alegria', otherValue);
    teoBayesTest.equals(otherHappyResultTeoBayes, 0.000018518518518518518);

    var otherSadResultTeoBayes = naiveBayes.teoBayes('tristeza', otherValue);
    teoBayesTest.equals(otherSadResultTeoBayes, 0.0000171661376953125);

    teoBayesTest.test('when random new value', randomNewValueTest => {
        var randomNumValue = Math.floor(Math.random() * 100);
        var randomNumBayesResult = naiveBayes.teoBayes('alegria', randomNumValue.toString());
        randomNewValueTest.equals(randomNumBayesResult, 0)

        var randomWordsBayesResult = naiveBayes.teoBayes('alegria', 'extraviado libro');
        randomNewValueTest.equals(randomWordsBayesResult, 0)

        randomNewValueTest.end();
    });

    teoBayesTest.end();
});


