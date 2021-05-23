const Schema = require('./schema');

class NaiveBayes {

    constructor (schema){
        this._schema = schema;
    }

    // initialize schema except mainValuesResume
    initSchema (mainCharacteristic){
        const attributesMap = new Map();
        this._schema = new Schema(mainCharacteristic, new Map(), attributesMap, 0);
    }

    train (category, dataSet, dataSetLength) {
        if (this._schema.hipValuesMap === undefined || this._schema.attributesMap === undefined){
            return;
        }

        this._schema.totalCountTraining = (this._schema.totalCountTraining + dataSetLength);
        this.updateHipValuesMap(category, dataSetLength);

        if(! this._schema.attributesMap.has(category)){
            this._schema.attributesMap.set(category, this.buildFrequencyTextMap(dataSet));
        }

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

    buildFrequencyTextMap (dataSet){

        const frequencyMap = new Map();

        dataSet.forEach(rec => {
            if (frequencyMap.get(rec)){
                frequencyMap.set(rec, frequencyMap.get(rec) + 1);
            } else {
                frequencyMap.set(rec, 1);
            }
        });

        return frequencyMap;
    }

    updateHipValuesMap (categoryValue, numRecords){

        if (!this._schema.hipValuesMap.has(categoryValue)){
            this._schema.hipValuesMap.set(categoryValue, numRecords);
        } else {
            const lastCount = this._schema.hipValuesMap.get(categoryValue);
            this._schema.hipValuesMap.set(categoryValue, lastCount + numRecords);
        }
    }

    aprioriProb (hipValue){
        const probClass = this._schema.hipValuesMap.get(hipValue) / this._schema.totalCountTraining;
        console.log(`prob clase: ${probClass}`);
        return probClass;
    }

    textConditionalProb (category, messageWords) {

        console.log(`attributesMap.size: ${this._schema.attributesMap.size}`);
        const attFrequencyMap = this._schema.attributesMap.get(category);
        console.log(`attFrequencyMap.size: ${attFrequencyMap.size}`);
        const arrayCondProb = [messageWords.length];

        var vocSize = 0;
        for(const [key, value] of this._schema.attributesMap){
            vocSize += value.size;
        }

        const catSize = attFrequencyMap.size;

        console.log(`catSize: ${catSize}`);
        console.log(`vocSize: ${vocSize}`);

        //now determine P( w | c ) for each word `w` in the text
        for (let i = 0; i < messageWords.length; i++) {
            var frequencyByTrain = attFrequencyMap.get(messageWords[i]) || 0;
            const tokenProbability = frequencyByTrain + 1 / catSize + vocSize;

            arrayCondProb[i] = tokenProbability;
        }
        console.log(`arrayCondProb: ${arrayCondProb}`);

        const resultCondProb = arrayCondProb.reduce((acc, n) => acc * n);
        console.log(`resultCondProb: ${resultCondProb}, category: ${category}, messageWords: ${messageWords}`);
        return resultCondProb;
    }

    teoBayes (category, givenValue){
        const resultAPrioriProb = this.aprioriProb(category);
        let teoBayesResult = 0;
        let resultConditionalProb = 0;

        //classification type text
        const newMessageWords = givenValue.split(' ');
        resultConditionalProb = this.textConditionalProb(category, newMessageWords);
        teoBayesResult = resultAPrioriProb + resultConditionalProb;

        console.log(`category:${category}, teoBayesResult:${teoBayesResult}`);
        this._schema.bayesResultMap.set(category, teoBayesResult);//Set result in schema

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
