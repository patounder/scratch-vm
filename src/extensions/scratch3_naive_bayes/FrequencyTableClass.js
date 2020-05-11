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
}

module.exports = FrequencyTableClass;
