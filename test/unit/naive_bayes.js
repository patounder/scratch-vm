const test = require('tap').test;
const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/naive-bayes');
const Model = require('../../src/extensions/scratch3_naive_bayes/model');
const NaiveBayesInputsStub = require('./stub/naive_bayes_inputs')

test('clasiffy text', clasiffyTextTester => {

    const classifierName = 'emocion';

    clasiffyTextTester.test('init model', initModelTester => {

        initModelTester.test('classifier with undefined name', initUndefinedName => {
            var naiveBayes = new NaiveBayes();
            naiveBayes.initModel();
            initUndefinedName.equals(naiveBayes.model, undefined);
            initUndefinedName.end();
        });

        initModelTester.test('classifier with default name', initDefaultName => {
            const CATEGORY_DEFAULT_VALUE = 'nombre';
            var naiveBayes = new NaiveBayes();
            naiveBayes.initModel(CATEGORY_DEFAULT_VALUE);

            initDefaultName.equals(naiveBayes.model.name, 'nombre');

            initDefaultName.type(naiveBayes.model.mapCounterCategoryExamples, Map);
            initDefaultName.equals(naiveBayes.model.mapCounterCategoryExamples.size, 0);

            initDefaultName.type(naiveBayes.model.mapBagWordsForCategory, Map);
            initDefaultName.equals(naiveBayes.model.mapBagWordsForCategory.size, 0);

            initDefaultName.equals(naiveBayes.model.counterTotalExamples, 0);

            initDefaultName.equals(naiveBayes.model.arrayVocabulary.length, 0);

            initDefaultName.type(naiveBayes.model.mapBayesResult, Map);
            initDefaultName.equals(naiveBayes.model.mapBayesResult.size, 0);

            initDefaultName.end();
        });

        initModelTester.test('classifier name string', initStringName =>{
            var naiveBayes = new NaiveBayes();
            naiveBayes.initModel(classifierName);
            initStringName.equals(naiveBayes.model.name, 'emocion');

            initStringName.type(naiveBayes.model.mapCounterCategoryExamples, Map);
            initStringName.equals(naiveBayes.model.mapCounterCategoryExamples.size, 0);

            initStringName.type(naiveBayes.model.mapBagWordsForCategory, Map);
            initStringName.equals(naiveBayes.model.mapBagWordsForCategory.size, 0);

            initStringName.equals(naiveBayes.model.counterTotalExamples, 0);

            initStringName.equals(naiveBayes.model.arrayVocabulary.length, 0);

            initStringName.type(naiveBayes.model.mapBayesResult, Map);
            initStringName.equals(naiveBayes.model.mapBayesResult.size, 0);
            initStringName.end();
        });

        initModelTester.test('classifier with number', initNumberName =>{
            var naiveBayes = new NaiveBayes();
            naiveBayes.initModel(1234);
            initNumberName.equals(naiveBayes.model.name, 1234);

            initNumberName.type(naiveBayes.model.mapCounterCategoryExamples, Map);
            initNumberName.equals(naiveBayes.model.mapCounterCategoryExamples.size, 0);

            initNumberName.type(naiveBayes.model.mapBagWordsForCategory, Map);
            initNumberName.equals(naiveBayes.model.mapBagWordsForCategory.size, 0);

            initNumberName.equals(naiveBayes.model.counterTotalExamples, 0);

            initNumberName.equals(naiveBayes.model.arrayVocabulary.length, 0);

            initNumberName.type(naiveBayes.model.mapBayesResult, Map);
            initNumberName.equals(naiveBayes.model.mapBayesResult.size, 0);
            initNumberName.end();
        });



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
        wordsInVocabulary.end();
    });

    clasiffyTextTester.test('teo bayes', teoBayesTest => {
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel(classifierName);
        naiveBayes.train('alegria', NaiveBayesInputsStub.getArrayHappyExamples(), NaiveBayesInputsStub.getLengthArrayHappy());
        naiveBayes.train('tristeza', NaiveBayesInputsStub.getArraySadExamples(), NaiveBayesInputsStub.getLengthArraySad());

        var newValue = 'eres malvado conmigo';

        var happyResultTeoBayes = naiveBayes.teoBayes('alegria', newValue);
        teoBayesTest.equals(happyResultTeoBayes, 0.0008333333333333334);

        var sadResultTeoBayes = naiveBayes.teoBayes('tristeza', newValue);
        teoBayesTest.equals(sadResultTeoBayes, 0.001220703125);


        var otherValue = 'lo hiciste increible';

        var otherHappyResultTeoBayes = naiveBayes.teoBayes('alegria', otherValue);
        teoBayesTest.equals(otherHappyResultTeoBayes, 0.000018518518518518518);

        var otherSadResultTeoBayes = naiveBayes.teoBayes('tristeza', otherValue);
        teoBayesTest.equals(otherSadResultTeoBayes, 0.0000171661376953125);

        teoBayesTest.end();
    });

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

test('remove symbols', removeSymbolsTest =>{

    var funRemoveSymbols = function (myStr) {
        return myStr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    removeSymbolsTest.equals(funRemoveSymbols('Alegría'), 'alegria');
    removeSymbolsTest.equals(funRemoveSymbols('VideoJuegos'), 'videojuegos');
    removeSymbolsTest.equals(funRemoveSymbols('Video Juegos'), 'video juegos');

    removeSymbolsTest.end();
});
