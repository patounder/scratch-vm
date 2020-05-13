class Schema {

    constructor (mainAttribute, mainValuesMap, remainingAttributes, frequencyTablesMap, totalCountTraining){
        this._mainAttribute = mainAttribute;
        this._mainValuesMap = mainValuesMap;
        this._remainingAttributes = remainingAttributes;
        this._frequencyTablesMap = frequencyTablesMap;
        this._totalCountTraining = totalCountTraining;
    }

    get mainAttribute () {
        return this._mainAttribute;
    }

    set mainAttribute (value) {
        this._mainAttribute = value;
    }

    get mainValuesMap () {
        return this._mainValuesMap;
    }

    set mainValuesMap (value) {
        this._mainValuesMap = value;
    }

    get remainingAttributes () {
        return this._remainingAttributes;
    }

    set remainingAttributes (value) {
        this._remainingAttributes = value;
    }

    get frequencyTablesMap () {
        return this._frequencyTablesMap;
    }

    set frequencyTablesMap (value) {
        this._frequencyTablesMap = value;
    }

    get totalCountTraining () {
        return this._totalCountTraining;
    }

    set totalCountTraining (value) {
        this._totalCountTraining = value;
    }

    updateTotalCount (numRecords) {
        this._totalCountTraining = this._totalCountTraining + numRecords;
    }

    updateMainValuesMap (mainValue, numRecords){
        if (!this._mainValuesMap.has(mainValue)){ // not exist in array
            this._mainValuesMap.set(mainValue, numRecords);
        } else {
            const lastCount = this._mainValuesMap.get(mainValue);
            this._mainValuesMap.set(mainValue, lastCount + numRecords);
        }
    }

    updateFrequencyTableMap (mainValue, sampleArray){


        for (var [key, table] of Object.entries(this._frequencyTablesMap){
            table.updateFrequencyMap(mainValue, sampleArray);
            table.updateAttributesValues(sampleArray);
        }

        /*this._frequencyTablesMap.forEach(function (table, key, self) {

            // validate if exist entry in map
            if (!table.frequencyMap.has(mainValue)){
                table.frequencyMap.set(mainValue, freqMap);
            } else {
                // TODO validate when mainValue exist in map (use case when train with more one ds the same main value)
            }
        });*/
    }
}

module.exports = Schema;
