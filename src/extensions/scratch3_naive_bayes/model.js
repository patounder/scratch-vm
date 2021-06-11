class Model {

    constructor (mainAttribute, categoriesMap, attributesMap, totalCountTraining){
        this._mainAttribute = mainAttribute;
        this._categoriesMap = categoriesMap; //map para contar ejemplos por categoria
        this._attributesMap = attributesMap; // map con frequency table. Remover frequency table por bagWords
        this._totalCountTraining = totalCountTraining;
        this._bayesResultMap = new Map();
    }

    get mainAttribute () {
        return this._mainAttribute;
    }

    set mainAttribute (value) {
        this._mainAttribute = value;
    }

    get categoriesMap () {
        return this._categoriesMap;
    }

    set categoriesMap (value) {
        this._categoriesMap = value;
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

    get bayesResultMap (){
        return this._bayesResultMap;
    }

    set bayesResultMap (map) {
        this._bayesResultMap = map;
    }
}

module.exports = Model;
