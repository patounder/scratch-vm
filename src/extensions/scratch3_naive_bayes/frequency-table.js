class FrequencyTable {

    constructor (tableName, recordIndex, frequencyMap, attributeValues){
        this._tableName = tableName; // attribute name
        this._recordIndex = recordIndex;
        this._frequencyMap = frequencyMap; // matrix (map's map) between class (to predict) and remaining attributes
        this._attributeValues = attributeValues;
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

    get attributeValues () {
        return this._attributeValues;
    }

    set attributeValues (value) {
        this._attributeValues = value;
    }
}

module.exports = FrequencyTable;
