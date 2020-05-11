const test = require('tap').test;
const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/NaiveBayes');
const Schema = require('../../src/extensions/scratch3_naive_bayes/Schema');

const dsYesPlay = [['nublado', 'frio', 'normal', 'si'], ['nublado', 'templado', 'normal', 'si']];
const dsNoPlay = [['lluvioso', 'calor', 'alta', 'si']];
const remainingAttributes = ['cielo', 'temperatura', 'humedad', 'viento'];

const naiveBayes = new NaiveBayes(new Schema());

test('suma dummy', t => {
    t.equals(naiveBayes.sumDummy(1, 2), 3);
    t.end();
});


test('init config', t => {

    t.equals(naiveBayes._schema._mainAttribute, undefined);
    t.equals(naiveBayes._schema._remainingAttributes, undefined);
    t.equals(naiveBayes._schema.mainValuesMap, undefined);
    t.equals(naiveBayes._schema._totalCountTraining, undefined);
    t.equals(naiveBayes._schema._frequencyTablesMap, undefined);

    naiveBayes.initSchema('jugar', remainingAttributes);

    t.equals(naiveBayes._schema._mainAttribute, 'jugar');
    t.equals(naiveBayes._schema._remainingAttributes.length, 4);
    t.equals(naiveBayes._schema._totalCountTraining, 0);
    t.equals(naiveBayes._schema.mainValuesMap.size, 0);
    t.equals(naiveBayes._schema._frequencyTablesMap.size, 4);

    t.end();
});

