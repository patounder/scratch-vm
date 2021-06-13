const test = require('tap').test;
const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/naive-bayes');
const Model = require('../../src/extensions/scratch3_naive_bayes/model');
const NaiveBayesInputsStub = require('./stub/naive_bayes_inputs')

test('clasiffy text', clasiffyTextTester => {

    const classifierName = 'emocion';

    clasiffyTextTester.test('testing init model', initModelTester => {
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel(classifierName);

        initModelTester.equals(naiveBayes.model.name, 'emocion');

        initModelTester.type(naiveBayes.model.mapCounterCategoryExamples, Map);
        initModelTester.equals(naiveBayes.model.mapCounterCategoryExamples.size, 0);

        initModelTester.type(naiveBayes.model.mapBagWordsForCategory, Map);
        initModelTester.equals(naiveBayes.model.mapBagWordsForCategory.size, 0);

        initModelTester.equals(naiveBayes.model.counterTotalExamples, 0);

        initModelTester.equals(naiveBayes.model.arrayVocabulary.length, 0);

        initModelTester.type(naiveBayes.model.mapBayesResult, Map);
        initModelTester.equals(naiveBayes.model.mapBayesResult.size, 0);

        initModelTester.end();
    });


    clasiffyTextTester.test('training model', trainTextTester => {
        var naiveBayes = new NaiveBayes();
        //before init model
        naiveBayes.train('alegria', NaiveBayesInputsStub.getArrayHappyExamples(), NaiveBayesInputsStub.getLengthArrayHappy);
        naiveBayes.train('tristeza', NaiveBayesInputsStub.getArraySadExamples(), NaiveBayesInputsStub.getLengthArraySad);

        trainTextTester.equals(naiveBayes.model, undefined);
        //after initModel
        naiveBayes.initModel(classifierName);
        naiveBayes.train('alegria', NaiveBayesInputsStub.getArrayHappyExamples(), NaiveBayesInputsStub.getLengthArrayHappy());
        naiveBayes.train('tristeza', NaiveBayesInputsStub.getArraySadExamples(), NaiveBayesInputsStub.getLengthArraySad());

        trainTextTester.equals(naiveBayes.model.counterTotalExamples, 24);
        trainTextTester.equals(naiveBayes.model.mapBagWordsForCategory.size, 2);

        const happyMapBagOfWords = naiveBayes.model.mapBagWordsForCategory.get('alegria');
        const sadMapBagOfWords = naiveBayes.model.mapBagWordsForCategory.get('tristeza');

        trainTextTester.type(happyMapBagOfWords, Map);
        //test 'n' for category
        trainTextTester.equals(happyMapBagOfWords.size, 23);

        trainTextTester.type(sadMapBagOfWords, Map);
        //test 'n' for category
        trainTextTester.equals(sadMapBagOfWords.size, 27);

        trainTextTester.equals(naiveBayes.model.arrayVocabulary.length, 37);

        trainTextTester.equals(naiveBayes.model.mapBayesResult.size, 0);

        trainTextTester.end();
    });

    const givenValue = 'persona buena';

    clasiffyTextTester.test('', teoBayesTest => {
        const resultTeoBayesAlegres = naiveBayes.teoBayes('alegres', givenValue);
        const resultTeoBayesTristes = naiveBayes.teoBayes('tristes', givenValue);
        teoBayesTest.equals(resultTeoBayesAlegres > resultTeoBayesTristes, true);
        teoBayesTest.end();
    })
    clasiffyTextTester.end();
});

test('remove symbols', removeSymbolsTest =>{

    var funRemoveSymbols = function (myStr) {
        return myStr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    removeSymbolsTest.equals(funRemoveSymbols('Alegría'), 'alegria');
    removeSymbolsTest.equals(funRemoveSymbols('VideoJuegos'), 'videojuegos');
    removeSymbolsTest.equals(funRemoveSymbols('Video Juegos'), 'video juegos');

    removeSymbolsTest.end();
});
