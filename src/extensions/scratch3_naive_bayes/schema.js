class Schema {

    constructor (mainAttribute, mainValuesMap, remainingAttributes, attributesMap, totalCountTraining, classType){
        this._mainAttribute = mainAttribute;
        this._mainValuesMap = mainValuesMap;
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
