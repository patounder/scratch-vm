const test = require('tap').test;
const NaiveBayes = require('../../../src/extensions/scratch3_naive_bayes/naive-bayes');
const Model = require('../../../src/extensions/scratch3_naive_bayes/model');

test('init model', initModel =>{

    initModel.test('classifier with undefined name', undefinedName => {
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel();
        undefinedName.equals(naiveBayes.model, undefined);
        undefinedName.end();
    });

    initModel.test('classifier with default name', defaultName => {
        const CATEGORY_DEFAULT_VALUE = 'nombre';
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel(CATEGORY_DEFAULT_VALUE);

        defaultName.equals(naiveBayes.model.name, 'nombre');

        defaultName.type(naiveBayes.model.mapCounterCategoryExamples, Map);
        defaultName.equals(naiveBayes.model.mapCounterCategoryExamples.size, 0);

        defaultName.type(naiveBayes.model.mapBagWordsForCategory, Map);
        defaultName.equals(naiveBayes.model.mapBagWordsForCategory.size, 0);

        defaultName.equals(naiveBayes.model.counterTotalExamples, 0);

        defaultName.equals(naiveBayes.model.arrayVocabulary.length, 0);

        defaultName.type(naiveBayes.model.mapBayesResult, Map);
        defaultName.equals(naiveBayes.model.mapBayesResult.size, 0);

        defaultName.end();
    });

    initModel.test('classifier name string', stringName =>{
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel('emocion');
        stringName.equals(naiveBayes.model.name, 'emocion');

        stringName.type(naiveBayes.model.mapCounterCategoryExamples, Map);
        stringName.equals(naiveBayes.model.mapCounterCategoryExamples.size, 0);

        stringName.type(naiveBayes.model.mapBagWordsForCategory, Map);
        stringName.equals(naiveBayes.model.mapBagWordsForCategory.size, 0);

        stringName.equals(naiveBayes.model.counterTotalExamples, 0);

        stringName.equals(naiveBayes.model.arrayVocabulary.length, 0);

        stringName.type(naiveBayes.model.mapBayesResult, Map);
        stringName.equals(naiveBayes.model.mapBayesResult.size, 0);
        stringName.end();
    });

    initModel.test('classifier with number', numberName =>{
        var naiveBayes = new NaiveBayes();
        naiveBayes.initModel(1234);
        numberName.equals(naiveBayes.model.name, 1234);

        numberName.type(naiveBayes.model.mapCounterCategoryExamples, Map);
        numberName.equals(naiveBayes.model.mapCounterCategoryExamples.size, 0);

        numberName.type(naiveBayes.model.mapBagWordsForCategory, Map);
        numberName.equals(naiveBayes.model.mapBagWordsForCategory.size, 0);

        numberName.equals(naiveBayes.model.counterTotalExamples, 0);

        numberName.equals(naiveBayes.model.arrayVocabulary.length, 0);

        numberName.type(naiveBayes.model.mapBayesResult, Map);
        numberName.equals(naiveBayes.model.mapBayesResult.size, 0);
        numberName.end();
    });

    initModel.end();
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
