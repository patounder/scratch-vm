const test = require('tap').test;
const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/naive_bayes');
const Schema = require('../../src/extensions/scratch3_naive_bayes/schema');
const FrequencyTable = require('../../src/extensions/scratch3_naive_bayes/freq_table');

test('initSchema', t => {

    const naiveBayes = new NaiveBayes(new Schema());
    const mainAttr = 'disfrutaJugar';
    const arrayAttr = 'cielo,temperatura,humedad,viento'.toLowerCase().split(',');

    naiveBayes.initSchema(mainAttr, arrayAttr);

    t.equals(naiveBayes._schema.mainAttribute, 'disfrutaJugar');
    t.equals(naiveBayes._schema.totalCountTraining, 0);
    t.equals(naiveBayes._schema.frequencyTablesMap.size, 4);

    const freqCieloTable = naiveBayes._schema.frequencyTablesMap.get('cielo');
    t.type(freqCieloTable, FrequencyTable);
    t.equals(freqCieloTable._tableName, 'cielo');
    t.equals(freqCieloTable._recordIndex, 0);
    t.equals(freqCieloTable._frequencyMap.size, 0);
    t.equals(freqCieloTable._attributeValues.length, 0);

    const freqTempTable = naiveBayes._schema.frequencyTablesMap.get('temperatura');
    t.type(freqTempTable, FrequencyTable);
    t.equals(freqTempTable._tableName, 'temperatura');
    t.equals(freqTempTable._recordIndex, 1);
    t.equals(freqTempTable._frequencyMap.size, 0);
    t.equals(freqTempTable._attributeValues.length, 0);

    const freqHumeTable = naiveBayes._schema.frequencyTablesMap.get('humedad');
    t.type(freqHumeTable, FrequencyTable);
    t.equals(freqHumeTable._tableName, 'humedad');
    t.equals(freqHumeTable._recordIndex, 2);
    t.equals(freqHumeTable._frequencyMap.size, 0);
    t.equals(freqHumeTable._attributeValues.length, 0);

    const freqVientoTable = naiveBayes._schema.frequencyTablesMap.get('viento');
    t.type(freqVientoTable, FrequencyTable);
    t.equals(freqVientoTable._tableName, 'viento');
    t.equals(freqVientoTable._recordIndex, 3);
    t.equals(freqVientoTable._frequencyMap.size, 0);
    t.equals(freqVientoTable._attributeValues.length, 0);

    t.end();
});
