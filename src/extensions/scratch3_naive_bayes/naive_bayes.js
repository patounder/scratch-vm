const FrequencyTable = require('./freq_table');
const Schema = require('./schema')

class NaiveBayes {

    constructor (schema){
        this._schema = schema;
    }

    // initialize schema except mainValuesResume
    initSchema (mainAttribute, remainingAttributes, classType){
        const attributesMap = new Map();
        for (let i = 0; i < remainingAttributes.length; i++){
            const tableName = remainingAttributes[i];
            attributesMap.set(tableName, new FrequencyTable(tableName, i, new Map(), []));
        }
        this._schema = new Schema(mainAttribute, new Map(), remainingAttributes, attributesMap, 0, classType)
        //console.log(this._schema);
    }


    train (mainValue, sampleArray) {

        this.updateTotalCount(mainValue, sampleArray.length);
        this.updateHipValuesMap(mainValue, sampleArray.length);

        this._schema.attributesMap.forEach((v, k, m) => {
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

    // function to update schema when train with text (no tabulated data)
    // String Array Number -> Void
    // alegria ['eres,bueno,lo,hiciste,bien,te,quiero] 3 -> Void (pero se actualiza schema)
    trainForText (mainValue, sampleArray, nItems) {

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

    // Function calculate probability for givenValues in frequency table
    // [] -> Num
    // [lluvioso,frio,normal,fuerte] -> 12.34 (por mencionar algun numero)
    totalProb (givenValues){

        for (let i = 0; i < givenValues.length ; i++) {

        }
    }


    //conditionalProb :: si [lluvioso,frio,normal,fuerte] -> 0,986
    //conditionalProb :: no [lluvioso,frio,normal,fuerte] -> 0,1234
    tableConditionalProb (hip, givenValues) {
        const arrayKeys = Array.from(this._schema.attributesMap.keys());
        const constLaplaceAdd = 1;
        const arrayCondProb = [4];

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

    /*
    textConditionalProb = async function (text, category) {
        var self = this
            , maxProbability = -Infinity
            , chosenCategory = null

        var tokens = await self.tokenizer(text)
        var frequencyTable = self.frequencyTable(tokens)

        //start by calculating the overall probability of this category
        //=>  out of all documents we've ever looked at, how many were
        //    mapped to this category
        var categoryProbability = self.docCount[category] / self.totalDocuments

        //take the log to avoid underflow
        var logProbability = Math.log(categoryProbability)

        //now determine P( w | c ) for each word `w` in the text
        Object
            .keys(frequencyTable)
            .forEach(function (token) {
                var frequencyInText = frequencyTable[token]
                var tokenProbability = self.tokenProbability(token, category)

                // console.log('token: %s category: `%s` tokenProbability: %d', token, category, tokenProbability)

                //determine the log of the P( w | c ) for this word
                logProbability += frequencyInText * Math.log(tokenProbability)
            })

        return logProbability
    }*/


    teoBayes (hip, givenValue){
        const TABLE_CLASS_TYPE = 'table';
        const resultAPrioriProb = this.aprioriProb(hip)

        if (this._schema.classType === TABLE_CLASS_TYPE) {
            const givenValuesArray = givenValue.split(',')
            const resultConditionalProb = this.tableConditionalProb(hip, givenValuesArray)
            //const resultProbEvidence = this.naiveBayes.totalProb(givenValue);

            const teoBayesResult = resultConditionalProb * resultAPrioriProb
            //console.log(`teoBayesResult: ${teoBayesResult}`)
            return teoBayesResult;
        }

        //classification type text


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
