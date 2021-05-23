const test = require('tap').test;
const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/naive-bayes');
const Schema = require('../../src/extensions/scratch3_naive_bayes/schema');
const NaiveBayesInputsStub = require('./stub/naive_bayes_inputs')

test('categorize text', categorizeText => {
    const naiveBayes = new NaiveBayes(new Schema());
    const mainAttr = 'emocion';

    naiveBayes.initSchema(mainAttr);

    categorizeText.test('test for init schema', initTextSchema => {
        initTextSchema.equals(naiveBayes._schema.mainAttribute, 'emocion');
        initTextSchema.equals(naiveBayes._schema.totalCountTraining, 0);
        initTextSchema.equals(naiveBayes._schema.attributesMap.size, 0);

        initTextSchema.test('train text tests', trainTextTest => {

            const search = ' ';
            const replacer = new RegExp(search, 'g');
            const alegreSampleArray = NaiveBayesInputsStub.getAlegriaTextTrainingSet().join().replace(replacer, ',')
                .split(',').slice();
            naiveBayes.train('alegres', alegreSampleArray, 12);

            const tristeSampleArray = NaiveBayesInputsStub.getTristezaTextTrainingSet().join().replace(replacer, ',')
                .split(',').slice();
            naiveBayes.train('tristes', tristeSampleArray, 12);

            trainTextTest.equals(naiveBayes._schema.totalCountTraining, 24);
            trainTextTest.equals(naiveBayes._schema.hipValuesMap.size, 2);

            const alegresFrequencyMap = naiveBayes._schema.attributesMap.get('alegres');
            const tristesFrequencyMap = naiveBayes._schema.attributesMap.get('tristes');

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
