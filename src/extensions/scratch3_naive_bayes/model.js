class Model {

    constructor (mainAttribute, mapCounterCategoryDocuments, bagWordMapForCategory, totalExamplesCounter){
        this._mainAttribute = mainAttribute;
        this._mapCounterCategoryDocuments = mapCounterCategoryDocuments; //map para contar ejemplos por categoria
        this._bagWordMapForCategory = bagWordMapForCategory; // map con frequency table. Remover frequency table por bagWords
        this._totalExamplesCounter = totalExamplesCounter;
        this._bayesResultMap = new Map();
    }

    get mainAttribute () {
        return this._mainAttribute;
    }

    set mainAttribute (value) {
        this._mainAttribute = value;
    }

    get mapCounterCategoryDocuments () {
        return this._mapCounterCategoryDocuments;
    }

    set mapCounterCategoryDocuments (value) {
        this._mapCounterCategoryDocuments = value;
    }

    get remainingAttributes () {
        return this._remainingAttributes;
    }

    set remainingAttributes (value) {
        this._remainingAttributes = value;
    }

    get bagWordMapForCategory () {
        return this._bagWordMapForCategory;
    }

    set bagWordMapForCategory (value) {
        this._bagWordMapForCategory = value;
    }

    get totalExamplesCounter () {
        return this._totalExamplesCounter;
    }

    set totalExamplesCounter (value) {
        this._totalExamplesCounter = value;
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
