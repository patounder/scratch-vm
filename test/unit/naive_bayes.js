const test = require('tap').test;
const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/naive-bayes');
const Model = require('../../src/extensions/scratch3_naive_bayes/model');
const NaiveBayesInputsStub = require('./stub/naive_bayes_inputs')

test('categorize text', categorizeText => {
    const naiveBayes = new NaiveBayes();
    const mainAttr = 'emocion';

    naiveBayes.initModel(mainAttr);

    categorizeText.test('test for init schema', initTextSchema => {
        initTextSchema.equals(naiveBayes._model.mainAttribute, 'emocion');
        initTextSchema.equals(naiveBayes._model.totalCountTraining, 0);
        initTextSchema.equals(naiveBayes._model.attributesMap.size, 0);

        initTextSchema.test('train text tests', trainTextTest => {

            const search = ' ';
            const replacer = new RegExp(search, 'g');

            const alegreSampleArray = NaiveBayesInputsStub.getAlegriaTextTrainingSet().join().replace(replacer, ',')
                .split(',').slice();
            naiveBayes.train('alegres', alegreSampleArray, 12);

            const tristeSampleArray = NaiveBayesInputsStub.getTristezaTextTrainingSet().join().replace(replacer, ',')
                .split(',').slice();
            naiveBayes.train('tristes', tristeSampleArray, 12);

            trainTextTest.equals(naiveBayes._model.totalCountTraining, 24);
            trainTextTest.equals(naiveBayes._model._categoriesMap.size, 2);

            const alegresFrequencyMap = naiveBayes._model.attributesMap.get('alegres');
            const tristesFrequencyMap = naiveBayes._model.attributesMap.get('tristes');

            trainTextTest.type(alegresFrequencyMap, Map);
            trainTextTest.equals(alegresFrequencyMap.size, 23);

            trainTextTest.type(tristesFrequencyMap, Map);
            trainTextTest.equals(tristesFrequencyMap.size, 27);
            trainTextTest.end();
        })
        initTextSchema.end();
    });

    const givenValue = 'persona buena';

    categorizeText.test('', teoBayesTest => {
        const resultTeoBayesAlegres = naiveBayes.teoBayes('alegres', givenValue);
        const resultTeoBayesTristes = naiveBayes.teoBayes('tristes', givenValue);
        teoBayesTest.equals(resultTeoBayesAlegres > resultTeoBayesTristes, true);
        teoBayesTest.end();
    })
    categorizeText.end();
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
