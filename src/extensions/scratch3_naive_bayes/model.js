class Model {

    constructor (mainAttribute, mapCounterCategoryExamples, bagWordMapForCategory, counterTotalExamples){
        this._mainAttribute = mainAttribute;
        this._mapCounterCategoryExamples = mapCounterCategoryExamples; //map para contar ejemplos (documentos) por categoria
        this._mapBagWordsForCategory = bagWordMapForCategory; // map (category_val, map(word, occurrences))
        this._counterTotalExamples = counterTotalExamples;
        this._mapBayesResult = new Map();
    }

    get mainAttribute () {
        return this._mainAttribute;
    }

    set mainAttribute (value) {
        this._mainAttribute = value;
    }

    get mapCounterCategoryExamples () {
        return this._mapCounterCategoryExamples;
    }

    set mapCounterCategoryExamples (value) {
        this._mapCounterCategoryExamples = value;
    }

    get remainingAttributes () {
        return this._remainingAttributes;
    }

    set remainingAttributes (value) {
        this._remainingAttributes = value;
    }

    get mapBagWordsForCategory () {
        return this._mapBagWordsForCategory;
    }

    set mapBagWordsForCategory (value) {
        this._mapBagWordsForCategory = value;
    }

    get counterTotalExamples () {
        return this._counterTotalExamples;
    }

    set counterTotalExamples (value) {
        this._counterTotalExamples = value;
    }

    get classType () {
        return this._classType;
    }

    set classType (value) {
        this._classType = value;
    }

    get mapBayesResult (){
        return this._mapBayesResult;
    }

    set mapBayesResult (map) {
        this._mapBayesResult = map;
    }
}

module.exports = Model;
