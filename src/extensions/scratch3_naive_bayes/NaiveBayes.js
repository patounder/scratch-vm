const FrequencyTable = require('./FrequencyTableClass');

class NaiveBayes {

    constructor (schema){
        this._schema = schema; // schema with all data
    }

    // initialize schema except mainValuesResume
    initSchema (mainAttribute, remainingAttributes){
        this._schema.mainAttribute = mainAttribute;
        this._schema.remainingAttributes = remainingAttributes;
        this._schema.mainValuesMap = new Map();
        this._schema.totalCountTraining = 0;

        const emptyAttributeValues = [];
        const emptyMap = new Map();
        const frequencyTablesMap = new Map();
        for (let i = 0; i < remainingAttributes.length; i++){
            const tableName = remainingAttributes[i];
            frequencyTablesMap.set(tableName, new FrequencyTable(tableName, i, emptyMap, emptyAttributeValues));
        }

        this._schema.frequencyTablesMap = frequencyTablesMap;
    }


    train (mainValue, sampleArray) {
        this._schema.updateTotalCount(sampleArray.length);
        this._schema.updateMainValuesMap(mainValue, sampleArray.length);
        this._schema.updateFrequencyTableMap(mainValue, sampleArray);
        console.log(this._schema);
    }

    probApriori (mainValue){
        const probClass = this._schema.mainValuesMap.get(mainValue) / this._schema.totalCountTraining;
        console.log(`prob clase: ${probClass}`);
        return probClass;
    }

    probConditional (attributeName, attributeValue, mainValue){

        const freqTable = this._schema.frequencyTablesMap.get(attributeName);
        const attributeFreq = freqTable.frequencyMap.get(mainValue).get(attributeValue);
        const resultProbCond = attributeFreq / this._schema.mainValuesMap.get(mainValue);
        console.log(`prob condicional para valor: ${attributeValue}, atributo: ${attributeName}, valor clase: ${mainValue} es: ${resultProbCond}`);
        return resultProbCond;
    }

    sumDummy (a, b){
        return a + b;
    }
}

module.exports = NaiveBayes;
