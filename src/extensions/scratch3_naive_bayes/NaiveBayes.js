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

        const frequencyTablesMap = new Map();
        for (let i = 0; i < remainingAttributes.length; i++){
            const tableName = remainingAttributes[i];
            frequencyTablesMap.set(tableName, new FrequencyTable(tableName, i, new Map(), []));
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

           this.buildAttributesValues(sampleArray, v.attributeValues, v.recordIndex);
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

    aprioriProb (mainValue){
        const probClass = this._schema.mainValuesMap.get(mainValue) / this._schema.totalCountTraining;
        console.log(`prob clase: ${probClass}`);
        return probClass;
    }

    //conditionalProb :: si [lluvioso,frio,normal,fuerte] -> 0,986
    //conditionalProb :: no [lluvioso,frio,normal,fuerte] -> 0,1234
    conditionalProb (hip, newValues) {
        const arrayKeys = Array.from(this._schema.frequencyTablesMap.keys());
        const constLaplaceAdd = 1;
        const arrayCondProb = [4];

        for (let i = 0; i < newValues.length ; i++) {

            let freqTable = this._schema.frequencyTablesMap.get(arrayKeys[i]);
            let attFrequency = freqTable.frequencyMap.get(hip).get(newValues[i]);

            if (typeof attFrequency === 'undefined'){
                attFrequency = 0;
            }

            arrayCondProb[i] = (attFrequency + constLaplaceAdd) /
                (this._schema.mainValuesMap.get(hip) + freqTable.attributeValues.length);
        }

        const resultCondProb = arrayCondProb.reduce((acc, n) => acc * n);
        console.log(`resultCondProb: ${resultCondProb}, hip: ${hip}, newValues: ${newValues}`);
        return resultCondProb;
    }

    totalProb (givenValues){

    }

    hMAP(hNames, hValues){
        var selectedIndex = 0;
        var maxValue = 0;

        console.log(`hNames: ${hNames}, hValues:${hValues}`);
        for(let i = 0; i < hValues.length; i++){
            if (hValues[i] > maxValue){
                maxValue = hValues[i];
                selectedIndex = i;
            }
        }

        return hNames[selectedIndex];
    }

}

module.exports = NaiveBayes;
