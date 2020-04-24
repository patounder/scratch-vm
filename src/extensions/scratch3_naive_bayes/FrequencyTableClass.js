class FrequencyTableClass {

    constructor (tableName, recordIndex, frequencyMap){
        this._tableName = tableName; // attribute name
        this._recordIndex = recordIndex;
        this._frequencyMap = frequencyMap; // matrix (map's map) between class (to predict) and remaining attributes
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
}

module.exports = FrequencyTableClass;
