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
        const arrayCondProb = [messageWords.length];

        var vocSize = 0;
        for(const [key, value] of this._model.mapBagWordsForCategory){
            vocSize += value.size;
        }

        const catSize = mapBagWordCategory.size;

        console.log(`catSize: ${catSize}`);
        console.log(`vocSize: ${vocSize}`);

        //now determine P( w | c ) for each word `w` in the text
        for (let i = 0; i < messageWords.length; i++) {
            var frequencyByTrain = mapBagWordCategory.get(messageWords[i]) || 0;
            const tokenProbability = frequencyByTrain + 1 / catSize + vocSize;

            arrayCondProb[i] = tokenProbability;
        }
        console.log(`arrayCondProb: ${arrayCondProb}`);

        const resultCondProb = arrayCondProb.reduce((acc, n) => acc * n);
        console.log(`resultCondProb: ${resultCondProb}, category: ${category}, messageWords: ${messageWords}`);
        return resultCondProb;
    }

    teoBayes (category, givenValue){
        const resultAPrioriProb = this.aprioriProb(category);
        let teoBayesResult = 0;
        let resultConditionalProb = 0;

        //classification type text
        const newMessageWords = givenValue.split(' ');
        resultConditionalProb = this.textConditionalProb(category, newMessageWords);
        teoBayesResult = resultAPrioriProb + resultConditionalProb;

        console.log(`category:${category}, teoBayesResult:${teoBayesResult}`);
        this._model.mapBayesResult.set(category, teoBayesResult);//Set result in schema

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
}

module.exports = NaiveBayes;
