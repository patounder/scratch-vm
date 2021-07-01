const test = require('tap').test;
const NaiveBayes = require('../../../src/extensions/scratch3_naive_bayes/naive-bayes');
const Model = require('../../../src/extensions/scratch3_naive_bayes/model');
const MockInputsNaiveBayes = require('./mock_inputs');

test('maxima', maximaTest => {
    var naiveBayes = new NaiveBayes();
    naiveBayes.initModel('emocion');
    naiveBayes.train('alegria', MockInputsNaiveBayes.getArrayHappyExamples(), MockInputsNaiveBayes.getLengthArrayHappy());
    naiveBayes.train('tristeza', MockInputsNaiveBayes.getArraySadExamples(), MockInputsNaiveBayes.getLengthArraySad());

    var newValue = 'eres malvado conmigo';
    var happyResultTeoBayes = naiveBayes.teoBayes('alegria', newValue);
    var sadResultTeoBayes = naiveBayes.teoBayes('tristeza', newValue);
    var resultBayes = [happyResultTeoBayes, sadResultTeoBayes];
    var selectedCategory = naiveBayes.maxCategoryFrom(resultBayes);
    maximaTest.equals(selectedCategory, 'tristeza');

    var otherValue = 'lo hiciste increible';
    var otherHappyResultTeoBayes = naiveBayes.teoBayes('alegria', otherValue);
    var otherSadResultTeoBayes = naiveBayes.teoBayes('tristeza', otherValue);
    var otherResultBayes = [otherHappyResultTeoBayes, otherSadResultTeoBayes];
    var otherSelectedCategory = naiveBayes.maxCategoryFrom(otherResultBayes);
    maximaTest.equals(otherSelectedCategory, 'alegria');

    maximaTest.test('when param is not array', arrayRandom => {

        var categorySelected = naiveBayes.maxCategoryFrom('1234');
        arrayRandom.equals(categorySelected, 'indefinida');

        var categoryNumSelected = naiveBayes.maxCategoryFrom(65456);
        arrayRandom.equals(categoryNumSelected, 'indefinida');

        arrayRandom.end();
    });

    maximaTest.end();
});
