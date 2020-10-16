const test = require('tap').test;
const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/naive_bayes');
const Schema = require('../../src/extensions/scratch3_naive_bayes/schema');
const FrequencyTable = require('../../src/extensions/scratch3_naive_bayes/freq_table');
const NaiveBayesInputsStub = require('./stub/naive_bayes_inputs')

test('categorize table data', categorizeTable => {

    const naiveBayes = new NaiveBayes(new Schema());
    const mainAttr = 'disfrutaJugar';
    const arrayAttr = 'cielo,temperatura,humedad,viento'.toLowerCase().split(',');
    const classType = 'table'

    categorizeTable.test('init schema for type table classification', initTableSchema => {


        naiveBayes.initSchema(mainAttr, arrayAttr, classType);

        initTableSchema.equals(naiveBayes._schema.mainAttribute, 'disfrutaJugar');
        initTableSchema.equals(naiveBayes._schema.totalCountTraining, 0);
        initTableSchema.equals(naiveBayes._schema.attributesMap.size, 4);
        initTableSchema.equals(naiveBayes._schema.classType, 'table');

        initTableSchema.test('atributes map tests', attributeMapTest => {

            const attributeMapCielo = naiveBayes._schema.attributesMap.get('cielo');
            attributeMapTest.type(attributeMapCielo, FrequencyTable);
            attributeMapTest.equals(attributeMapCielo._tableName, 'cielo');
            attributeMapTest.equals(attributeMapCielo._recordIndex, 0);
            attributeMapTest.equals(attributeMapCielo._frequencyMap.size, 0);
            attributeMapTest.equals(attributeMapCielo._attributeValues.length, 0);

            const attributeMapTemp = naiveBayes._schema.attributesMap.get('temperatura');
            attributeMapTest.type(attributeMapTemp, FrequencyTable);
            attributeMapTest.equals(attributeMapTemp._tableName, 'temperatura');
            attributeMapTest.equals(attributeMapTemp._recordIndex, 1);
            attributeMapTest.equals(attributeMapTemp._frequencyMap.size, 0);
            attributeMapTest.equals(attributeMapTemp._attributeValues.length, 0);

            const attributeMapHume = naiveBayes._schema.attributesMap.get('humedad');
            attributeMapTest.type(attributeMapHume, FrequencyTable);
            attributeMapTest.equals(attributeMapHume._tableName, 'humedad');
            attributeMapTest.equals(attributeMapHume._recordIndex, 2);
            attributeMapTest.equals(attributeMapHume._frequencyMap.size, 0);
            attributeMapTest.equals(attributeMapHume._attributeValues.length, 0);

            const attributeMapViento = naiveBayes._schema.attributesMap.get('viento');
            attributeMapTest.type(attributeMapViento, FrequencyTable);
            attributeMapTest.equals(attributeMapViento._tableName, 'viento');
            attributeMapTest.equals(attributeMapViento._recordIndex, 3);
            attributeMapTest.equals(attributeMapViento._frequencyMap.size, 0);
            attributeMapTest.equals(attributeMapViento._attributeValues.length, 0);
            attributeMapTest.end();
        });
        initTableSchema.end();
    });

    categorizeTable.test('train for table text', trainTable => {

        trainTable.test('with examples yes enjoy', enjoyYesDs =>{
            naiveBayes.train('si', NaiveBayesInputsStub.getSiDisfrutaTableTrainningSet(), 9)

            enjoyYesDs.equals(naiveBayes._schema.totalCountTraining, 9)
            enjoyYesDs.equals(naiveBayes._schema.hipValuesMap.get('si'), 9)
            enjoyYesDs.equals(naiveBayes._schema.attributesMap.size, 4)

            //Cielo FrequencyTable
            const cieloFrequencyTable = naiveBayes._schema.attributesMap.get('cielo')
            enjoyYesDs.type(cieloFrequencyTable, FrequencyTable)
            enjoyYesDs.equals(cieloFrequencyTable.tableName, 'cielo')
            enjoyYesDs.equals(cieloFrequencyTable.recordIndex, 0)
            enjoyYesDs.equals(cieloFrequencyTable.attributeValues.join(), 'nublado,lluvioso,soleado')
            const cieloFrequencyMap = cieloFrequencyTable.frequencyMap
            enjoyYesDs.type(cieloFrequencyMap, Map)
            const cieloSiMap = cieloFrequencyMap.get('si')
            enjoyYesDs.equals(cieloSiMap.get('soleado'), 2)
            enjoyYesDs.equals(cieloSiMap.get('nublado'), 4)
            enjoyYesDs.equals(cieloSiMap.get('lluvioso'), 3)

            const temperaturaFrequencyTable = naiveBayes._schema.attributesMap.get('temperatura')
            enjoyYesDs.type(temperaturaFrequencyTable, FrequencyTable)
            enjoyYesDs.equals(temperaturaFrequencyTable.tableName, 'temperatura')
            enjoyYesDs.equals(temperaturaFrequencyTable.recordIndex, 1)
            enjoyYesDs.equals(temperaturaFrequencyTable.attributeValues.join(), 'caluroso,templado,frio')

            const temperaturarequencyMap = temperaturaFrequencyTable.frequencyMap
            enjoyYesDs.type(temperaturarequencyMap, Map)
            const temperaturaSiMap = temperaturarequencyMap.get('si')
            enjoyYesDs.equals(temperaturaSiMap.get('caluroso'), 2)
            enjoyYesDs.equals(temperaturaSiMap.get('templado'), 4)
            enjoyYesDs.equals(temperaturaSiMap.get('frio'), 3)

            const humedadFrequencyTable = naiveBayes._schema.attributesMap.get('humedad')
            enjoyYesDs.type(humedadFrequencyTable, FrequencyTable)
            enjoyYesDs.equals(humedadFrequencyTable.tableName, 'humedad')
            enjoyYesDs.equals(humedadFrequencyTable.recordIndex, 2)
            enjoyYesDs.equals(humedadFrequencyTable.attributeValues.join(), 'alta,normal')

            const humedadFrequencyMap = humedadFrequencyTable.frequencyMap
            enjoyYesDs.type(humedadFrequencyMap, Map)
            const humedadSiMap = humedadFrequencyMap.get('si')
            enjoyYesDs.equals(humedadSiMap.get('alta'), 3)
            enjoyYesDs.equals(humedadSiMap.get('normal'), 6)

            const vientoFrequencyTable = naiveBayes._schema.attributesMap.get('viento')
            enjoyYesDs.type(vientoFrequencyTable, FrequencyTable)
            enjoyYesDs.equals(vientoFrequencyTable.tableName, 'viento')
            enjoyYesDs.equals(vientoFrequencyTable.recordIndex, 3)
            enjoyYesDs.equals(vientoFrequencyTable.attributeValues.join(), 'debil,fuerte')

            const vientoFrequencyMap = vientoFrequencyTable.frequencyMap
            enjoyYesDs.type(vientoFrequencyMap, Map)
            const vientoSiMap = vientoFrequencyMap.get('si')
            enjoyYesDs.equals(vientoSiMap.get('fuerte'), 3)
            enjoyYesDs.equals(vientoSiMap.get('debil'), 6)

            enjoyYesDs.end()
        })

        trainTable.test('with examples no enjoy ', noEnjoyDs => {
            const examplesNoEnjoy = NaiveBayesInputsStub.getNoDisfrutaTableTrainningSet()
            naiveBayes.train('no', examplesNoEnjoy, examplesNoEnjoy.length)

            noEnjoyDs.equals(naiveBayes._schema.totalCountTraining, 14)
            noEnjoyDs.equals(naiveBayes._schema.hipValuesMap.get('no'), 5)
            noEnjoyDs.equals(naiveBayes._schema.attributesMap.size, 4)

            noEnjoyDs.end()
        })
        trainTable.end()
    });

    //TODO categorize table
    categorizeTable.end()
})

test('categorize text', categorizeText => {
    const naiveBayes = new NaiveBayes(new Schema());
    const mainAttr = 'emocion';
    const arrayAttr = 'mensaje'.toLowerCase().split(',');
    const classType = 'text'

    naiveBayes.initSchema(mainAttr, arrayAttr, classType);

    categorizeText.test('test for init schema', initTextSchema =>{
        initTextSchema.equals(naiveBayes._schema.mainAttribute, 'emocion');
        initTextSchema.equals(naiveBayes._schema.totalCountTraining, 0);
        initTextSchema.equals(naiveBayes._schema.attributesMap.size, 1);
        initTextSchema.equals(naiveBayes._schema.classType, 'text');

        initTextSchema.test('train text tests', trainTextTest => {

            const search = ' '
            const replacer = new RegExp(search, 'g')
            const alegreSampleArray = NaiveBayesInputsStub.getAlegriaTextTrainingSet().join().replace(replacer, ',')
                .split(',').slice()
            naiveBayes.train('alegres', alegreSampleArray, 12);

            const tristeSampleArray = NaiveBayesInputsStub.getTristezaTextTrainingSet().join().replace(replacer, ',')
                .split(',').slice()
            naiveBayes.train('tristes', tristeSampleArray, 12);

            trainTextTest.equals(naiveBayes._schema.totalCountTraining, 24);
            trainTextTest.equals(naiveBayes._schema.hipValuesMap.size, 2);

            const mensajeFreqTableAfterTrainText = naiveBayes._schema.attributesMap.get('mensaje');
            trainTextTest.type(mensajeFreqTableAfterTrainText, FrequencyTable);

            const alegresFrequencyMap = mensajeFreqTableAfterTrainText.frequencyMap.get('alegres');
            const tristesFrequencyMap = mensajeFreqTableAfterTrainText.frequencyMap.get('tristes');

            trainTextTest.type(alegresFrequencyMap, Map);
            trainTextTest.equals(alegresFrequencyMap.size, 23);

            trainTextTest.type(tristesFrequencyMap, Map);
            trainTextTest.equals(tristesFrequencyMap.size, 27);
            trainTextTest.end();
        })
        initTextSchema.end()
    })

    const givenValue = 'persona buena'

    categorizeText.test('', teoBayesTest => {
        const resultTeoBayesAlegres = naiveBayes.teoBayes('alegres', givenValue)
        const resultTeoBayesTristes = naiveBayes.teoBayes('tristes', givenValue)
        teoBayesTest.equals(resultTeoBayesAlegres > resultTeoBayesTristes, true)
        teoBayesTest.end()
    })
    categorizeText.end();
});
