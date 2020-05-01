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
        this._schema._totalCountTraining = 0;

        const frequencyTablesMap = new Map();
        for (let i = 0; i < remainingAttributes.length; i++){
            const tableName = remainingAttributes[i];
            frequencyTablesMap.set(tableName, new FrequencyTable(tableName, i, new Map()));
        }

        this._schema.frequencyTablesMap = frequencyTablesMap;
        console.log(this._schema);
    }


    train (mainValue, sampleArray) {

        this.updateTotalCount(mainValue, sampleArray.length);
        this.updateMainValuesMap(mainValue, sampleArray.length);

        this._schema.frequencyTablesMap.forEach((v, k, m) => {
            const freqMap = this.buildFrequencyMap(sampleArray, v.recordIndex, mainValue);

            // validate if exist entry in map
            if (!v.frequencyMap.has(mainValue)){
                v.frequencyMap.set(mainValue, freqMap);
            } else {
                // TODO validate when mainValue exist in map (use case when train with more one ds the same main value)
            }
        });

        console.log(this._schema);
    }

    // return map with attributes (keys) and occurrences (values)
    buildFrequencyMap (records, attributeIndex){
        // let V : {v|v is a possible outcome of node.test-cond}.

        const frequencyMap = new Map();

        records.forEach(rec => {
            const attributeKey = rec[attributeIndex];

            if (frequencyMap.get(attributeKey)){
                frequencyMap.set(attributeKey, frequencyMap.get(attributeKey) + 1);
            } else {
                frequencyMap.set(attributeKey, 1);
            }
        });

        return frequencyMap;
    }

    updateTotalCount (mainValue, numRecords) {
        this._schema.totalCountTraining = (this._schema.totalCountTraining + numRecords);
    }

    updateMainValuesMap (mainValue, numRecords){
        if (!this._schema.mainValuesMap.has(mainValue)){ // not exist in array
            this._schema.mainValuesMap.set(mainValue, numRecords);
        } else {
            const lastCount = this._schema.mainValuesMap.get(mainValue);
            this._schema.mainValuesMap.set(mainValue, lastCount + numRecords);
        }
    }

    getProbClass (mainValue){
        const probClass = this._schema.mainValuesMap.get(mainValue) / this._schema.totalCountTraining;
        console.log(`prob clase: ${probClass}`);
        return probClass;
    }

    getProbConditional (attributeName, attributeValue, mainValue){
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
