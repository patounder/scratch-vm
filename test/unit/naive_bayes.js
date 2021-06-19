const test = require('tap').test;
const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/naive-bayes');
const Model = require('../../src/extensions/scratch3_naive_bayes/model');
const NaiveBayesInputsStub = require('./naive_bayes/mock_inputs')

test('clasiffy text', clasiffyTextTester => {

    const classifierName = 'emocion';

    clasiffyTextTester.test('maxima', maximaTest => {
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel(classifierName);
        naiveBayes.train('alegria', NaiveBayesInputsStub.getArrayHappyExamples(), NaiveBayesInputsStub.getLengthArrayHappy());
        naiveBayes.train('tristeza', NaiveBayesInputsStub.getArraySadExamples(), NaiveBayesInputsStub.getLengthArraySad());

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
        maximaTest.end();
    });

    clasiffyTextTester.end();
});

