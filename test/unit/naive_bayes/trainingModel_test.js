const test = require('tap').test;
const NaiveBayes = require('../../../src/extensions/scratch3_naive_bayes/naive-bayes');
const Model = require('../../../src/extensions/scratch3_naive_bayes/model');
const MockInputsNaiveBayes = require('./mock_inputs')

test('training model', trainTester => {

    trainTester.test('with undefined model (without init)', trainWithUndefinedModel => {
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

    trainTester.test('with example list empty', emptyTrainList =>{
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel('emocion');
        naiveBayes.train('foo', MockInputsNaiveBayes.getArrayEmptyExamples(), MockInputsNaiveBayes.getLengthArrayEmpty());

        emptyTrainList.equals(naiveBayes.model.counterTotalExamples, 0);
        emptyTrainList.equals(naiveBayes.model.mapBagWordsForCategory.size, 1);

        const fooMapBagOfWords = naiveBayes.model.mapBagWordsForCategory.get('foo');

        emptyTrainList.type(fooMapBagOfWords, Map);
        //test 'n' for category
        emptyTrainList.equals(fooMapBagOfWords.size, 0);

        emptyTrainList.equals(naiveBayes.model.arrayVocabulary.length, 0);
        emptyTrainList.equals(naiveBayes.model.mapBayesResult.size, 0);

        emptyTrainList.end();
    });

    trainTester.test('with string like example list', stringLikeList =>{
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel('name');
        naiveBayes.train('foo', 'bar', 0);

        stringLikeList.equals(naiveBayes.model.name, 'name');

        stringLikeList.type(naiveBayes.model.mapCounterCategoryExamples, Map);
        stringLikeList.equals(naiveBayes.model.mapCounterCategoryExamples.size, 0);

        stringLikeList.equals(naiveBayes.model.counterTotalExamples, 0);
        stringLikeList.type(naiveBayes.model.mapBagWordsForCategory, Map);
        stringLikeList.equals(naiveBayes.model.mapBagWordsForCategory.size, 0);

        const fooMapBagOfWords = naiveBayes.model.mapBagWordsForCategory.get('foo');

        stringLikeList.type(fooMapBagOfWords, undefined);

        stringLikeList.equals(naiveBayes.model.arrayVocabulary.length, 0);
        stringLikeList.type(naiveBayes.model.mapBayesResult, Map);
        stringLikeList.equals(naiveBayes.model.mapBayesResult.size, 0);

        stringLikeList.end();
    });

    trainTester.test('with number like example list', numberLikeList =>{
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel('name');
        naiveBayes.train('foo', 123, 0);

        numberLikeList.equals(naiveBayes.model.name, 'name');

        numberLikeList.type(naiveBayes.model.mapCounterCategoryExamples, Map);
        numberLikeList.equals(naiveBayes.model.mapCounterCategoryExamples.size, 0);

        numberLikeList.equals(naiveBayes.model.counterTotalExamples, 0);
        numberLikeList.type(naiveBayes.model.mapBagWordsForCategory, Map);
        numberLikeList.equals(naiveBayes.model.mapBagWordsForCategory.size, 0);

        const fooMapBagOfWords = naiveBayes.model.mapBagWordsForCategory.get('foo');

        numberLikeList.type(fooMapBagOfWords, undefined);

        numberLikeList.equals(naiveBayes.model.arrayVocabulary.length, 0);
        numberLikeList.type(naiveBayes.model.mapBayesResult, Map);
        numberLikeList.equals(naiveBayes.model.mapBayesResult.size, 0);

        numberLikeList.end();
    });


    trainTester.end();
});
