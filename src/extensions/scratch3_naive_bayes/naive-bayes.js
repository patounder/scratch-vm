const Model = require('./model');

class NaiveBayes {

    constructor (){
        this._model = undefined;
    }

    get model(){
        return this._model;
    }

    set model(value){
        this._model = value;
    }

    initModel (name){
        if(name === undefined){
            console.log('invalid classifier name');
            return;
        }

        const mapBagWordsForCategory = new Map();
        const mapCounterCategoryExamples = new Map();
        const arrayVocabulary = [];
        const counterTotalExamples = 0;
        this._model = new Model(name, mapCounterCategoryExamples, mapBagWordsForCategory, counterTotalExamples, arrayVocabulary);
    }

    train (category, trainingWords, documentsCounter) {
        if (this._model === undefined){
            console.log('model undefined');
            return;
        }

        if(!Array.isArray(trainingWords)){
            console.log(`not array trainingWords= ${trainingWords}`);
            return;
        }

        //console.log(`trainingWords= ${trainingWords}`);
        this._model.counterTotalExamples = (this._model.counterTotalExamples + documentsCounter);
        this.updateMapCategoryCounter(category, documentsCounter);

        if(!this._model.mapBagWordsForCategory.has(category)){
            this._model.mapBagWordsForCategory.set(category, this.buildBagOfWordsFrom(trainingWords));
        }

        var categoryWords =  Array.from(this._model.mapBagWordsForCategory.get(category).keys());
        var vocabularyWithNewWords = this._model.arrayVocabulary.concat(categoryWords);
        var vocabularyWithUniqueWords = vocabularyWithNewWords.filter((word, index) => {
            return vocabularyWithNewWords.indexOf(word) == index;
        });
        this._model.arrayVocabulary = vocabularyWithUniqueWords;

        console.log(this._model);
    }

    buildBagOfWordsFrom (trainingWords){

        const mapBagOfWordsWithOcurrences = new Map();

        trainingWords.forEach(rec => {
            if (mapBagOfWordsWithOcurrences.get(rec)){
                mapBagOfWordsWithOcurrences.set(rec, mapBagOfWordsWithOcurrences.get(rec) + 1);
            } else {
                mapBagOfWordsWithOcurrences.set(rec, 1);
            }
        });

        return mapBagOfWordsWithOcurrences;
    }

    updateMapCategoryCounter (categoryValue, documentsCounter){

        if (!this._model.mapCounterCategoryExamples.has(categoryValue)){
            this._model.mapCounterCategoryExamples.set(categoryValue, documentsCounter);
        } else {
            const lastCount = this._model.mapCounterCategoryExamples.get(categoryValue);
            this._model.mapCounterCategoryExamples.set(categoryValue, lastCount + documentsCounter);
        }
    }

    aprioriProb (hipValue){
        const probClass = this._model.mapCounterCategoryExamples.get(hipValue) / this._model.counterTotalExamples;
        console.log(`prob clase: ${probClass}`);
        return probClass;
    }

    textConditionalProb (category, messageWords) {

        console.log(`mapBagWordsForCategory.size: ${this._model.mapBagWordsForCategory.size}`);
        const mapBagWordCategory = this._model.mapBagWordsForCategory.get(category);
        console.log(`mapBagWordCategory.size: ${mapBagWordCategory.size}`);
        const arrayProbConditional = [];


        //now determine P( w | c ) for each word `w` in the text, use m-estimate function
        for (let word of messageWords) {
            var nk = mapBagWordCategory.get(word) || 0;
            const tokenProbability = (nk + 1) / (mapBagWordCategory.size + this._model.arrayVocabulary.length);
            arrayProbConditional.push(tokenProbability);
        }

        console.log(`arrayCondProb: ${arrayProbConditional}`);

        const resultCondProb = arrayProbConditional.reduce((acc, n) => acc * n);
        console.log(`resultCondProb: ${resultCondProb}, category: ${category}, messageWords: ${messageWords}`);
        return resultCondProb;
    }

    teoBayes (category, newExample){

        const wordsInVocabulary = this.wordsInVocabulary(newExample.split(' '));

        let resultConditionalProb = this.textConditionalProb(category, wordsInVocabulary);

        const resultAPrioriProb = this.aprioriProb(category);
        var teoBayesResult = resultAPrioriProb * resultConditionalProb;

        console.log(`category:${category}, teoBayesResult:${teoBayesResult}`);
        this._model.mapBayesResult.set(category, teoBayesResult);

        return teoBayesResult;
    }

    maxCategoryFrom(hValues){
        var maxValue = 0;

        console.log(`hValues:${hValues}`);
        for (let i = 0; i < hValues.length; i++){
            if (hValues[i] > maxValue){
                maxValue = hValues[i];
            }
        }
        return this.getKey(maxValue);
    }

    getKey(value) {
        const selectedKey = [...this._model.mapBayesResult].find(([key, val]) => val == value)[0];
        console.log(`selected key:${selectedKey}`);
        return selectedKey;
    }

    wordsInVocabulary(arrayWords){
        var result = [];

        for(let word of arrayWords){
            if(this._model.arrayVocabulary.indexOf(word) >= 0){
                result.push(word);
            }
        }

        return result;
    }
}

module.exports = NaiveBayes;
