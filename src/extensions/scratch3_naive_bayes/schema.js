class Schema {

    constructor (mainAttribute, hipValuesMap, remainingAttributes, attributesMap, totalCountTraining, classType){
        this._mainAttribute = mainAttribute;
        this._hipValuesMap = hipValuesMap;
        this._remainingAttributes = remainingAttributes;
        this._attributesMap = attributesMap;
        this._totalCountTraining = totalCountTraining;
        this._classType = classType;
    }

    get mainAttribute () {
        return this._mainAttribute;
    }

    set mainAttribute (value) {
        this._mainAttribute = value;
    }

    get hipValuesMap () {
        return this._hipValuesMap;
    }

    set hipValuesMap (value) {
        this._hipValuesMap = value;
    }

    get remainingAttributes () {
        return this._remainingAttributes;
    }

    set remainingAttributes (value) {
        this._remainingAttributes = value;
    }

    get attributesMap () {
        return this._attributesMap;
    }

    set attributesMap (value) {
        this._attributesMap = value;
    }

    get totalCountTraining () {
        return this._totalCountTraining;
    }

    set totalCountTraining (value) {
        this._totalCountTraining = value;
    }

    get classType () {
        return this._classType;
    }

    set classType (value) {
        this._classType = value;
    }
}

module.exports = Schema;
