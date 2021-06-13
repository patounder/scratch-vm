class Model {

    constructor (name, mapCounterCategoryExamples, mapBagWordForCategory, counterTotalExamples, arrayVocabulary){
        this._name = name;
        this._mapCounterCategoryExamples = mapCounterCategoryExamples; //map para contar ejemplos (documentos) por categoria
        this._mapBagWordsForCategory = mapBagWordForCategory; // map (category_val, map(word, occurrences))
        this._counterTotalExamples = counterTotalExamples;
        this._arrayVocabulary = arrayVocabulary;
        this._mapBayesResult = new Map();
    }

    get name () {
        return this._name;
    }

    set name (value) {
        this._name = value;
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

    get arrayVocabulary(){
        return this._arrayVocabulary;
    }

    set arrayVocabulary(value){
        this._arrayVocabulary = value;
    }

    get mapBayesResult (){
        return this._mapBayesResult;
    }

    set mapBayesResult (map) {
        this._mapBayesResult = map;
    }
}

module.exports = Model;
