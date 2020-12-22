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
            naiveBayes.train('si', NaiveBayesInputsStub.getYesEnjoyTrainingSet(), 9)

            enjoyYesDs.equals(naiveBayes._schema.totalCountTraining, 9)
            enjoyYesDs.equals(naiveBayes._schema.hipValuesMap.get('si'), 9)
            enjoyYesDs.equals(naiveBayes._schema.attributesMap.size, 4)

            //Cielo FrequencyTable
            const cieloFrequencyTableAfterYesEnjoy = naiveBayes._schema.attributesMap.get('cielo')
            enjoyYesDs.type(cieloFrequencyTableAfterYesEnjoy, FrequencyTable)
            enjoyYesDs.equals(cieloFrequencyTableAfterYesEnjoy.tableName, 'cielo')
            enjoyYesDs.equals(cieloFrequencyTableAfterYesEnjoy.recordIndex, 0)
            enjoyYesDs.equals(cieloFrequencyTableAfterYesEnjoy.attributeValues.join(), 'nublado,lluvioso,soleado')
            const cieloFrequencyMap = cieloFrequencyTableAfterYesEnjoy.frequencyMap
            enjoyYesDs.type(cieloFrequencyMap, Map)
            const cieloSiMap = cieloFrequencyMap.get('si')
            enjoyYesDs.equals(cieloSiMap.get('soleado'), 2)
            enjoyYesDs.equals(cieloSiMap.get('nublado'), 4)
            enjoyYesDs.equals(cieloSiMap.get('lluvioso'), 3)

            const temperaturaFrequencyTableAfterYesEnjoy = naiveBayes._schema.attributesMap.get('temperatura')
            enjoyYesDs.type(temperaturaFrequencyTableAfterYesEnjoy, FrequencyTable)
            enjoyYesDs.equals(temperaturaFrequencyTableAfterYesEnjoy.tableName, 'temperatura')
            enjoyYesDs.equals(temperaturaFrequencyTableAfterYesEnjoy.recordIndex, 1)
            enjoyYesDs.equals(temperaturaFrequencyTableAfterYesEnjoy.attributeValues.join(), 'caluroso,templado,frio')
            const tempFrequencyMap = temperaturaFrequencyTableAfterYesEnjoy.frequencyMap
            enjoyYesDs.type(tempFrequencyMap, Map)
            const temperaturaSiMap = tempFrequencyMap.get('si')
            enjoyYesDs.equals(temperaturaSiMap.get('caluroso'), 2)
            enjoyYesDs.equals(temperaturaSiMap.get('templado'), 4)
            enjoyYesDs.equals(temperaturaSiMap.get('frio'), 3)

            const humedadFrequencyTableAfterYesEnjoy = naiveBayes._schema.attributesMap.get('humedad')
            enjoyYesDs.type(humedadFrequencyTableAfterYesEnjoy, FrequencyTable)
            enjoyYesDs.equals(humedadFrequencyTableAfterYesEnjoy.tableName, 'humedad')
            enjoyYesDs.equals(humedadFrequencyTableAfterYesEnjoy.recordIndex, 2)
            enjoyYesDs.equals(humedadFrequencyTableAfterYesEnjoy.attributeValues.join(), 'alta,normal')
            const humedadFrequencyMap = humedadFrequencyTableAfterYesEnjoy.frequencyMap
            enjoyYesDs.type(humedadFrequencyMap, Map)
            const humedadSiMap = humedadFrequencyMap.get('si')
            enjoyYesDs.equals(humedadSiMap.get('alta'), 3)
            enjoyYesDs.equals(humedadSiMap.get('normal'), 6)

            const vientoFrequencyTableAfterYesEnjoy = naiveBayes._schema.attributesMap.get('viento')
            enjoyYesDs.type(vientoFrequencyTableAfterYesEnjoy, FrequencyTable)
            enjoyYesDs.equals(vientoFrequencyTableAfterYesEnjoy.tableName, 'viento')
            enjoyYesDs.equals(vientoFrequencyTableAfterYesEnjoy.recordIndex, 3)
            enjoyYesDs.equals(vientoFrequencyTableAfterYesEnjoy.attributeValues.join(), 'debil,fuerte')
            const vientoFrequencyMap = vientoFrequencyTableAfterYesEnjoy.frequencyMap
            enjoyYesDs.type(vientoFrequencyMap, Map)
            const vientoSiMap = vientoFrequencyMap.get('si')
            enjoyYesDs.equals(vientoSiMap.get('fuerte'), 3)
            enjoyYesDs.equals(vientoSiMap.get('debil'), 6)

            enjoyYesDs.end()
        })

        trainTable.test('with examples no enjoy ', enjoyNoDs => {
            const examplesNoEnjoy = NaiveBayesInputsStub.getNoEnjoyTrainingSet()
            naiveBayes.train('no', examplesNoEnjoy, examplesNoEnjoy.length)

            enjoyNoDs.equals(naiveBayes._schema.totalCountTraining, 14)
            enjoyNoDs.equals(naiveBayes._schema.hipValuesMap.get('no'), 5)
            enjoyNoDs.equals(naiveBayes._schema.attributesMap.size, 4)

            //FrequencyTables. Many test are remaining by train enjoy yes
            const cieloFrequencyMap = naiveBayes._schema.attributesMap.get('cielo').frequencyMap
            enjoyNoDs.type(cieloFrequencyMap, Map)
            const cieloNoMap = cieloFrequencyMap.get('no')
            enjoyNoDs.equals(cieloNoMap.get('soleado'), 3)
            enjoyNoDs.equals(cieloNoMap.get('nublado'), undefined)
            enjoyNoDs.equals(cieloNoMap.get('lluvioso'), 2)

            const tempFrequencyMap = naiveBayes._schema.attributesMap.get('temperatura').frequencyMap
            enjoyNoDs.type(tempFrequencyMap, Map)
            const temperaturaNoMap = tempFrequencyMap.get('no')
            enjoyNoDs.equals(temperaturaNoMap.get('caluroso'), 2)
            enjoyNoDs.equals(temperaturaNoMap.get('templado'), 2)
            enjoyNoDs.equals(temperaturaNoMap.get('frio'), 1)

            const humedadFrequencyMap = naiveBayes._schema.attributesMap.get('humedad').frequencyMap
            enjoyNoDs.type(humedadFrequencyMap, Map)
            const humedadNoMap = humedadFrequencyMap.get('no')
            enjoyNoDs.equals(humedadNoMap.get('alta'), 4)
            enjoyNoDs.equals(humedadNoMap.get('normal'), 1)

            const vientoFrequencyMap = naiveBayes._schema.attributesMap.get('viento').frequencyMap
            enjoyNoDs.type(vientoFrequencyMap, Map)
            const vientoNoMap = vientoFrequencyMap.get('no')
            enjoyNoDs.equals(vientoNoMap.get('fuerte'), 3)
            enjoyNoDs.equals(vientoNoMap.get('debil'), 2)

            enjoyNoDs.end()
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

    categorizeText.test('test for init schema', initTextSchema => {
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
