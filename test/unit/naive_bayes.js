const test = require('tap').test;
const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/naive_bayes');
const Schema = require('../../src/extensions/scratch3_naive_bayes/schema');
const FrequencyTable = require('../../src/extensions/scratch3_naive_bayes/freq_table');

test('init schema disfruta jugar', initTableSchema => {

    const naiveBayes = new NaiveBayes(new Schema());
    const mainAttr = 'disfrutaJugar';
    const arrayAttr = 'cielo,temperatura,humedad,viento'.toLowerCase().split(',');
    const classType = 'table'

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

test('initSchema for text example', initTextSchema => {

    const naiveBayes = new NaiveBayes(new Schema());
    const mainAttr = 'emocion';
    const arrayAttr = 'mensaje'.toLowerCase().split(',');
    const classType = 'text'

    naiveBayes.initSchema(mainAttr, arrayAttr, classType);

    initTextSchema.equals(naiveBayes._schema.mainAttribute, 'emocion');
    initTextSchema.equals(naiveBayes._schema.totalCountTraining, 0);
    initTextSchema.equals(naiveBayes._schema.attributesMap.size, 1);
    initTextSchema.equals(naiveBayes._schema.classType, 'text')

    const freqTextoTable = naiveBayes._schema.attributesMap.get('mensaje');
    initTextSchema.type(freqTextoTable, FrequencyTable);
    initTextSchema.equals(freqTextoTable._tableName, 'mensaje');
    initTextSchema.equals(freqTextoTable._recordIndex, 0);
    initTextSchema.equals(freqTextoTable._frequencyMap.size, 0);
    initTextSchema.equals(freqTextoTable._attributeValues.length, 0);

    const alegreSampleArray = 'eres,bueno,lo,hiciste,bien,te,quiero,bueno,completamente'.toLowerCase().split(',');
    naiveBayes.trainForText('alegres', alegreSampleArray, 4)

    initTextSchema.equals(naiveBayes._schema.totalCountTraining, 4);
    initTextSchema.equals(naiveBayes._schema.hipValuesMap.size, 1);

    const mensajeAttribute = naiveBayes._schema.attributesMap.get('mensaje');
    initTextSchema.type(mensajeAttribute, FrequencyTable);
    const alegresFrequencyMap = mensajeAttribute.frequencyMap.get('alegres');

    initTextSchema.type(alegresFrequencyMap, Map);
    initTextSchema.equals(alegresFrequencyMap.size, 8)
    initTextSchema.equals(alegresFrequencyMap.get('eres'), 1)
    initTextSchema.equals(alegresFrequencyMap.get('bien'), 1)
    initTextSchema.equals(alegresFrequencyMap.get('bueno'), 2)

    const tristeSampleArray = 'eres,malo,no,te,quiero,haces,todo,mal'.toLowerCase().split(',');
    naiveBayes.trainForText('tristes', tristeSampleArray, 3);

    initTextSchema.equals(naiveBayes._schema.totalCountTraining, 7);
    initTextSchema.equals(naiveBayes._schema.hipValuesMap.size, 2);

    const mensajeAttributeAfterTrainTristesText = naiveBayes._schema.attributesMap.get('mensaje');
    initTextSchema.type(mensajeAttributeAfterTrainTristesText, FrequencyTable);

    const tristesFrequencyMap = mensajeAttributeAfterTrainTristesText.frequencyMap.get('tristes');
    initTextSchema.type(tristesFrequencyMap, Map);
    initTextSchema.equals(tristesFrequencyMap.size, 8)
    initTextSchema.equals(tristesFrequencyMap.get('no'), 1)
    initTextSchema.equals(tristesFrequencyMap.get('malo'), 1)
    initTextSchema.equals(tristesFrequencyMap.get('mal'), 1)

    initTextSchema.end();
});


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
        initTextSchema.equals(naiveBayes._schema.classType, 'text')

        initTextSchema.test('train text tests', trainTextTest => {

            const alegreSampleArray = 'eres,bueno,una,buena,persona,te,quiero,mujer,buena'.toLowerCase().split(',');
            naiveBayes.trainForText('alegres', alegreSampleArray, 4);

            const tristeSampleArray = 'eres,malo,no,te,quiero,haces,todo,mal'.toLowerCase().split(',');
            naiveBayes.trainForText('tristes', tristeSampleArray, 3);

            trainTextTest.equals(naiveBayes._schema.totalCountTraining, 7);
            trainTextTest.equals(naiveBayes._schema.hipValuesMap.size, 2);

            const mensajeFreqTableAfterTrainText = naiveBayes._schema.attributesMap.get('mensaje');
            trainTextTest.type(mensajeFreqTableAfterTrainText, FrequencyTable);

            const alegresFrequencyMap = mensajeFreqTableAfterTrainText.frequencyMap.get('alegres');
            const tristesFrequencyMap = mensajeFreqTableAfterTrainText.frequencyMap.get('tristes');

            trainTextTest.type(alegresFrequencyMap, Map);
            trainTextTest.equals(alegresFrequencyMap.size, 8);

            trainTextTest.type(tristesFrequencyMap, Map);
            trainTextTest.equals(tristesFrequencyMap.size, 8);
            trainTextTest.end();
        })
        initTextSchema.end()
    })

    const givenValue = 'persona buena'

    categorizeText.test('', teoBayesTest => {
        teoBayesTest.test('test for text conditional probability', textConditionalProb =>{
            const newExample = givenValue.split(' ')
            const resultAlegre = naiveBayes.textConditionalProb('alegres', newExample);
            const resultTriste = naiveBayes.textConditionalProb('tristes', newExample);
            textConditionalProb.equals(resultAlegre > resultTriste, true)

            textConditionalProb.end();
        })

        const resultTeoBayesAlegres = naiveBayes.teoBayes('alegres', givenValue)
        const resultTeoBayesTristes = naiveBayes.teoBayes('tristes', givenValue)
        teoBayesTest.equals(resultTeoBayesAlegres > resultTeoBayesTristes, true)
        teoBayesTest.end()
    })
    categorizeText.end();
});
