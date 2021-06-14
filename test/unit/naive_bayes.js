const test = require('tap').test;
const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/naive-bayes');
const Model = require('../../src/extensions/scratch3_naive_bayes/model');
const NaiveBayesInputsStub = require('./stub/naive_bayes_inputs')

test('clasiffy text', clasiffyTextTester => {

    const classifierName = 'emocion';

    clasiffyTextTester.test('init model', initModelTester => {
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
        trainTextTester.equals(naiveBayes.model.arrayVocabulary.indexOf('eres'),
            naiveBayes.model.arrayVocabulary.lastIndexOf('eres'));

        trainTextTester.equals(naiveBayes.model.mapBayesResult.size, 0);

        trainTextTester.end();
    });

    clasiffyTextTester.test('words in vocabulary', wordsInVocabulary => {
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel(classifierName);
        naiveBayes.train('alegria', NaiveBayesInputsStub.getArrayHappyExamples(), NaiveBayesInputsStub.getLengthArrayHappy());
        naiveBayes.train('tristeza', NaiveBayesInputsStub.getArraySadExamples(), NaiveBayesInputsStub.getLengthArraySad());

        const newValueWords = 'eres increible conmigo'.split(' ');
        wordsInVocabulary.equals(naiveBayes.wordsInVocabulary(newValueWords).toString(), ['eres','increible'].toString());

        const otherNewValue = 'no sabia que seldria mal'.split(' ');
        wordsInVocabulary.equals(naiveBayes.wordsInVocabulary(otherNewValue).toString(), ['no','que','mal'].toString());

    });


    clasiffyTextTester.test('teo bayes', teoBayesTest => {
        naiveBayes.initModel(classifierName);
        naiveBayes.train('alegria', NaiveBayesInputsStub.getArrayHappyExamples(), NaiveBayesInputsStub.getLengthArrayHappy());
        naiveBayes.train('tristeza', NaiveBayesInputsStub.getArraySadExamples(), NaiveBayesInputsStub.getLengthArraySad());

        var newValue = 'eres malvado conmigo';

        var resultTeoBayesAlegria = naiveBayes.teoBayes('alegria', newValue);
        teoBayesTest.equals(resultTeoBayesAlegria, 0.008);

        var resultTeoBayesTristes = naiveBayes.teoBayes('tristeza', newValue);
        teoBayesTest.equals(resultTeoBayesTristes, 0.001);


        var otherValue = 'lo hiciste increible';

        var resultTeoBayesAlegria2 = naiveBayes.teoBayes('alegria', otherValue);
        teoBayesTest.equals(resultTeoBayesAlegria2, 0.000017);

        var resultTeoBayesTristes2 = naiveBayes.teoBayes('tristeza', otherValue);
        teoBayesTest.equals(resultTeoBayesTristes2, 0.000015);

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
