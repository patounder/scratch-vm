const FrequencyTable = require('./freq_table');

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

        const attributesMap = new Map();
        for (let i = 0; i < remainingAttributes.length; i++){
            const tableName = remainingAttributes[i];
            attributesMap.set(tableName, new FrequencyTable(tableName, i, new Map(), []));
        }

        this._schema.attributesMap = attributesMap;
        //console.log(this._schema);
    }


    train (mainValue, sampleArray) {

        this.updateTotalCount(mainValue, sampleArray.length);
        this.updateMainValuesMap(mainValue, sampleArray.length);

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
        this.updateMainValuesMap(mainValue, nItems);

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
        //console.log(this._schema.attributesMap.get('mensaje'));
        //console.log(this._schema.attributesMap.get('mensaje')._frequencyMap.get('alegres'));
        /*

            //initialize category data structures if we've never seen this category. DONE
            //self.initializeCategory(mainValue)

            //update our count of how many documents mapped to this category
            self.docCount[mainValue]++

            //update the total number of documents we have learned from
            self.totalDocuments++

            //normalize the text into a word array
            var tokens = await self.tokenizer(text)

            //get a frequency count for each token in the text
            var frequencyTable = self.frequencyTable(tokens)
        */

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
    conditionalProb (hip, givenValues) {
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
                (this._schema.mainValuesMap.get(hip) + freqTable.attributeValues.length);
        }

        const resultCondProb = arrayCondProb.reduce((acc, n) => acc * n);
        console.log(`resultCondProb: ${resultCondProb}, hip: ${hip}, newValues: ${givenValues}`);
        return resultCondProb;
    }

    // Function calculate probability for givenValues in frequency table
    // [] -> Num
    // [lluvioso,frio,normal,fuerte] -> 12.34 (por mencionar algun numero)
    totalProb (givenValues){

        for (let i = 0; i < givenValues.length ; i++) {

        }
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
