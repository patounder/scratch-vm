const FrequencyTable = require('./frequency-table');
const Schema = require('./schema');

class NaiveBayes {

    constructor (schema){
        this._schema = schema;
    }

    // initialize schema except mainValuesResume
    initSchema (mainCharacteristic, baseCharacteristics){
        const attributesMap = new Map();
        for (let i = 0; i < baseCharacteristics.length; i++){
            const tableName = baseCharacteristics[i];
            attributesMap.set(tableName, new FrequencyTable(tableName, i, new Map(), []));
        }
        this._schema = new Schema(mainCharacteristic, new Map(), baseCharacteristics, attributesMap, 0);
    }

    train (mainValue, sampleArray, nItems) {
        if (this._schema.hipValuesMap === undefined || this._schema.attributesMap === undefined){
            return;
        }

        this.updateTotalCount(mainValue, nItems);
        this.updateHipValuesMap(mainValue, nItems);

        this._schema.attributesMap.forEach((v, k, m) => {
            const freqMap = this.buildFrequencyTextMap(sampleArray);

            // validate if exist entry in map
            if (!v.frequencyMap.has(mainValue)){
                v.frequencyMap.set(mainValue, freqMap);
            } else {
                // TODO validate when mainValue exist in map (use case when train with more one ds the same main value)
            }
        });

        console.log(this._schema);
    }

    buildAttributesValues (records, attributesValues, index){
        records.forEach(rec => {
            if (!attributesValues.includes(rec[index])){
                attributesValues.push(rec[index]);
            }
        });
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

    buildFrequencyTextMap (records){

        const frequencyMap = new Map();

        records.forEach(rec => {
            if (frequencyMap.get(rec)){
                frequencyMap.set(rec, frequencyMap.get(rec) + 1);
            } else {
                frequencyMap.set(rec, 1);
            }
        });

        return frequencyMap;
    }

    updateTotalCount (mainValue, numRecords) {
        this._schema.totalCountTraining = (this._schema.totalCountTraining + numRecords);
    }

    updateHipValuesMap (mainValue, numRecords){

        if (!this._schema.hipValuesMap.has(mainValue)){ // not exist in array
            this._schema.hipValuesMap.set(mainValue, numRecords);
        } else {
            const lastCount = this._schema.hipValuesMap.get(mainValue);
            this._schema.hipValuesMap.set(mainValue, lastCount + numRecords);
        }
    }

    aprioriProb (hipValue){
        const probClass = this._schema.hipValuesMap.get(hipValue) / this._schema.totalCountTraining;
        console.log(`prob clase: ${probClass}`);
        return probClass;
    }

    //conditionalProb :: si [lluvioso,frio,normal,fuerte] -> 0,986
    //conditionalProb :: no [lluvioso,frio,normal,fuerte] -> 0,1234
    tableConditionalProb (hip, givenValues) {
        const arrayKeys = Array.from(this._schema.attributesMap.keys());
        const constLaplaceAdd = 1;
        const arrayCondProb = [4]; //TODO update length of array

        for (let i = 0; i < givenValues.length ; i++) {

            let freqTable = this._schema.attributesMap.get(arrayKeys[i]);
            let attFrequency = freqTable.frequencyMap.get(hip).get(givenValues[i]);

            if (typeof attFrequency === 'undefined'){
                attFrequency = 0;
            }

            arrayCondProb[i] = (attFrequency + constLaplaceAdd) /
                (this._schema.hipValuesMap.get(hip) + freqTable.attributeValues.length);
        }

        const resultCondProb = arrayCondProb.reduce((acc, n) => acc * n);
        console.log(`resultCondProb: ${resultCondProb}, hip: ${hip}, newValues: ${givenValues}`);
        return resultCondProb;
    }

    textConditionalProb (hipValue, words) {

        const uniqueAttributeIndex = 0
        const attName = this._schema.remainingAttributes[uniqueAttributeIndex];
        const attFreqTable = this._schema.attributesMap.get(attName);
        const attFrequencyMap = attFreqTable.frequencyMap.get(hipValue);
        const arrayCondProb = [words.length];

        const vocabularySize = function () {
            const wordsMap = attFreqTable.frequencyMap;
            var vocabularyCount = 0;
            wordsMap.forEach(function (hValue, hKey, m){
                vocabularyCount += hValue.size;
            });
            return vocabularyCount;
        };

        const catSize = attFrequencyMap.size;
        const vocSize = vocabularySize();

        //now determine P( w | c ) for each word `w` in the text
        for (let i = 0; i < words.length; i++){
            var frequencyByTrain = attFrequencyMap.get(words[i]) || 0;
            const tokenProbability = frequencyByTrain + 1 / catSize + vocSize;

            arrayCondProb[i] = tokenProbability;
        }
        const resultCondProb = arrayCondProb.reduce((acc, n) => acc * n);
        //console.log(`resultCondProb: ${resultCondProb}, hip: ${hip}, newValues: ${givenValues}`);
        return resultCondProb;
    }

    teoBayes (hip, givenValue){
        const resultAPrioriProb = this.aprioriProb(hip)
        let teoBayesResult = 0;
        let resultConditionalProb = 0;

        //classification type text
        const words = givenValue.split(' ');
        resultConditionalProb = this.textConditionalProb(hip, words);
        teoBayesResult = resultAPrioriProb + resultConditionalProb;

        console.log(`set hip:${hip}, teoBayesResult:${teoBayesResult}`);
        this._schema.bayesResultMap.set(hip, teoBayesResult);//Set result in schema

        return teoBayesResult;
    }

    hMAP(hValues){
        var maxValue = 0;

        console.log(`hValues:${hValues}`);
        for (let i = 0; i < hValues.length; i++){
            if (hValues[i] > maxValue){
                maxValue = hValues[i];
            }
        }
        return this.getKey(maxValue);
    }

    getKey(value) {
        const selectedKey = [...this._schema.bayesResultMap].find(([key, val]) => val == value)[0];
        console.log(`selected key:${selectedKey}`);
        return selectedKey;
    }
}

module.exports = NaiveBayes;
