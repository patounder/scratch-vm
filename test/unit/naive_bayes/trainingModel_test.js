const test = require('tap').test;
const NaiveBayes = require('../../../src/extensions/scratch3_naive_bayes/naive-bayes');
const Model = require('../../../src/extensions/scratch3_naive_bayes/model');
const MockInputsNaiveBayes = require('./mock_inputs')

test('training model', trainTester => {

    trainTester.test('with undefinedn model', trainWithUndefinedModel => {
        var naiveBayes = new NaiveBayes();
        naiveBayes.train('alegria', MockInputsNaiveBayes.getArrayHappyExamples(), MockInputsNaiveBayes.getLengthArrayHappy);
        naiveBayes.train('tristeza', MockInputsNaiveBayes.getArraySadExamples(), MockInputsNaiveBayes.getLengthArraySad);
        trainWithUndefinedModel.equals(naiveBayes.model, undefined);
        trainWithUndefinedModel.end();
    });

    trainTester.test('train with text', trainModelText =>{
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel('emocion');
        naiveBayes.train('alegria', MockInputsNaiveBayes.getArrayHappyExamples(), MockInputsNaiveBayes.getLengthArrayHappy());
        naiveBayes.train('tristeza', MockInputsNaiveBayes.getArraySadExamples(), MockInputsNaiveBayes.getLengthArraySad());

        trainModelText.equals(naiveBayes.model.counterTotalExamples, 24);
        trainModelText.equals(naiveBayes.model.mapBagWordsForCategory.size, 2);

        const happyMapBagOfWords = naiveBayes.model.mapBagWordsForCategory.get('alegria');
        const sadMapBagOfWords = naiveBayes.model.mapBagWordsForCategory.get('tristeza');

        trainModelText.type(happyMapBagOfWords, Map);
        //test 'n' for category
        trainModelText.equals(happyMapBagOfWords.size, 23);

        trainModelText.type(sadMapBagOfWords, Map);
        //test 'n' for category
        trainModelText.equals(sadMapBagOfWords.size, 27);

        trainModelText.equals(naiveBayes.model.arrayVocabulary.length, 37);
        trainModelText.equals(naiveBayes.model.arrayVocabulary.indexOf('eres'),
            naiveBayes.model.arrayVocabulary.lastIndexOf('eres'));

        trainModelText.equals(naiveBayes.model.mapBayesResult.size, 0);

        trainModelText.test('words in vocabulary', wordsInVocabulary => {

            const newValueWords = 'eres increible conmigo'.split(' ');
            wordsInVocabulary.equals(naiveBayes.wordsInVocabulary(newValueWords).toString(), ['eres','increible'].toString());

            const otherNewValueWords = 'no sabia que seldria mal'.split(' ');
            wordsInVocabulary.equals(naiveBayes.wordsInVocabulary(otherNewValueWords).toString(), ['no','que','mal'].toString());
            wordsInVocabulary.end();
        });

        trainModelText.end();
    });

    trainTester.end();
});
