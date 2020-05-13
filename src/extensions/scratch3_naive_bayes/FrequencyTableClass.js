class FrequencyTableClass {

    constructor (tableName, recordIndex, frequencyMap, attributesValues){
        this._tableName = tableName; // attribute name
        this._recordIndex = recordIndex;
        this._frequencyMap = frequencyMap; // matrix (map's map) between class (to predict) and remaining attributes
        this._attributesValues = attributesValues;
    }

    get tableName () {
        return this._tableName;
    }

    set tableName (value) {
        this._tableName = value;
    }

    get recordIndex () {
        return this._recordIndex;
    }

    set recordIndex (value) {
        this._recordIndex = value;
    }

    get frequencyMap () {
        return this._frequencyMap;
    }

    set frequencyMap (value) {
        this._frequencyMap = value;
    }

    get attributesValues () {
        return this._attributesValues;
    }

    set attributesValues (value) {
        this._attributesValues = value;
    }

    // return map with attributes (keys) and occurrences (values)
    updateFrequencyMap (mainValue, records){
        // let V : {v|v is a possible outcome of node.test-cond}.

        const summaryAttMap = new Map();

        records.forEach(rec => {
            const attributeValue = rec[this._recordIndex];

            //Add to map
            if (summaryAttMap.get(attributeValue)){
                summaryAttMap.set(attributeValue, summaryAttMap.get(attributeValue) + 1);
            } else {
                summaryAttMap.set(attributeValue, 1);
            }

        });

        this._frequencyMap.set(mainValue, summaryAttMap);
    }

    updateAttributesValues (records){

        records.forEach(rec => {
            const attributeValue = rec[this._recordIndex];

            if(!this._attributesValues.includes(attributeValue)){
                this._attributesValues.push(attributeValue);
            }
        });
    }
}

module.exports = FrequencyTableClass;
