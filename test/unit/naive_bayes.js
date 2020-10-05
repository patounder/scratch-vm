const test = require('tap').test;
const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/naive_bayes');
const Schema = require('../../src/extensions/scratch3_naive_bayes/schema');
const FrequencyTable = require('../../src/extensions/scratch3_naive_bayes/freq_table');

/*
test('testing before and after', t => {
    let num1 = 0;
    const afterFun = function () {
        console.log('after');
    };

    const beforeFun = function () {
        console.log('before');
    };

    t.equals(num1, 1);

    t.afterEach((afterFun, v) => {
        console.log(v);
        afterFun();
    });

    t.beforeEach((beforeFun, t) => {
        num1 = 1;
        beforeFun();
    });
});*/

test('initSchema', t => {

    const naiveBayes = new NaiveBayes(new Schema());
    const mainAttr = 'disfrutaJugar';
    const arrayAttr = 'cielo,temperatura,humedad,viento'.toLowerCase().split(',');

    naiveBayes.initSchema(mainAttr, arrayAttr);

    t.equals(naiveBayes._schema.mainAttribute, 'disfrutaJugar');
    t.equals(naiveBayes._schema.totalCountTraining, 0);
    t.equals(naiveBayes._schema.attributesMap.size, 4);

    const freqCieloTable = naiveBayes._schema.attributesMap.get('cielo');
    t.type(freqCieloTable, FrequencyTable);
    t.equals(freqCieloTable._tableName, 'cielo');
    t.equals(freqCieloTable._recordIndex, 0);
    t.equals(freqCieloTable._frequencyMap.size, 0);
    t.equals(freqCieloTable._attributeValues.length, 0);

    const freqTempTable = naiveBayes._schema.attributesMap.get('temperatura');
    t.type(freqTempTable, FrequencyTable);
    t.equals(freqTempTable._tableName, 'temperatura');
    t.equals(freqTempTable._recordIndex, 1);
    t.equals(freqTempTable._frequencyMap.size, 0);
    t.equals(freqTempTable._attributeValues.length, 0);

    const freqHumeTable = naiveBayes._schema.attributesMap.get('humedad');
    t.type(freqHumeTable, FrequencyTable);
    t.equals(freqHumeTable._tableName, 'humedad');
    t.equals(freqHumeTable._recordIndex, 2);
    t.equals(freqHumeTable._frequencyMap.size, 0);
    t.equals(freqHumeTable._attributeValues.length, 0);

    const freqVientoTable = naiveBayes._schema.attributesMap.get('viento');
    t.type(freqVientoTable, FrequencyTable);
    t.equals(freqVientoTable._tableName, 'viento');
    t.equals(freqVientoTable._recordIndex, 3);
    t.equals(freqVientoTable._frequencyMap.size, 0);
    t.equals(freqVientoTable._attributeValues.length, 0);

    t.end();
});

test('initSchema for text example', t => {

    const naiveBayes = new NaiveBayes(new Schema());
    const mainAttr = 'emocion';
    const arrayAttr = 'mensaje'.toLowerCase().split(',');

    naiveBayes.initSchema(mainAttr, arrayAttr);

    t.equals(naiveBayes._schema.mainAttribute, 'emocion');
    t.equals(naiveBayes._schema.totalCountTraining, 0);
    t.equals(naiveBayes._schema.attributesMap.size, 1);

    const freqTextoTable = naiveBayes._schema.attributesMap.get('mensaje');
    t.type(freqTextoTable, FrequencyTable);
    t.equals(freqTextoTable._tableName, 'mensaje');
    t.equals(freqTextoTable._recordIndex, 0);
    t.equals(freqTextoTable._frequencyMap.size, 0);
    t.equals(freqTextoTable._attributeValues.length, 0);

    const alegreSampleArray = 'eres,bueno,lo,hiciste,bien,te,quiero,bueno,completamente'.toLowerCase().split(',');
    naiveBayes.trainForText('alegres', alegreSampleArray, 4)

    t.equals(naiveBayes._schema.totalCountTraining, 4);
    t.equals(naiveBayes._schema._mainValuesMap.size, 1);

    const mensajeAttribute = naiveBayes._schema.attributesMap.get('mensaje');
    t.type(mensajeAttribute, FrequencyTable);
    const alegresFrequencyMap = mensajeAttribute.frequencyMap.get('alegres');

    t.type(alegresFrequencyMap, Map);
    t.equals(alegresFrequencyMap.size, 8)
    t.equals(alegresFrequencyMap.get('eres'), 1)
    t.equals(alegresFrequencyMap.get('bien'), 1)
    t.equals(alegresFrequencyMap.get('bueno'), 2)


    const tristeSampleArray = 'eres,malo,no,te,quiero,haces,todo,mal'.toLowerCase().split(',');
    naiveBayes.trainForText('tristes', tristeSampleArray, 3);

    t.equals(naiveBayes._schema.totalCountTraining, 7);
    t.equals(naiveBayes._schema._mainValuesMap.size, 2);

    const mensajeAttributeAfterTrainTristesText = naiveBayes._schema.attributesMap.get('mensaje');
    t.type(mensajeAttributeAfterTrainTristesText, FrequencyTable);

    const tristesFrequencyMap = mensajeAttributeAfterTrainTristesText.frequencyMap.get('tristes');
    t.type(tristesFrequencyMap, Map);
    t.equals(tristesFrequencyMap.size, 8)
    t.equals(tristesFrequencyMap.get('no'), 1)
    t.equals(tristesFrequencyMap.get('malo'), 1)
    t.equals(tristesFrequencyMap.get('mal'), 1)

    t.end();
});
