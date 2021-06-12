const Model = require('./model');

class NaiveBayes {

    constructor (){
        this._model = undefined;
        this._learningModel = undefined;
    }

    // initialize schema except mainValuesResume
    initModel (mainCharacteristic){
        const bagWordMapForCategory = new Map();
        this._model = new Model(mainCharacteristic, new Map(), bagWordMapForCategory, 0);
    }

    train (category, categoryDocuments, documentsCounter) {
        if (this._model === undefined){
            console.log('model undefined');
            return;
        }

        this._model.totalExamplesCounter = (this._model.totalExamplesCounter + documentsCounter);
        this.updateMapCategoryCounter(category, documentsCounter);

        if(!this._model.bagWordMapForCategory.has(category)){
            this._model.bagWordMapForCategory.set(category, this.buildBagOfWordsFrom(categoryDocuments));
        }

        console.log(this._model);
    }

    buildAttributesValues (records, attributesValues, index){
        records.forEach(rec => {
            if (!attributesValues.includes(rec[index])){
                attributesValues.push(rec[index]);
            }
        });
    }

    // return map with attributes (keys) and occurrences (values)
    buildFrequencyMap (records, attributeIndex){
        // let V : {v|v is a possible outcome of node.test-cond}.
        const frequencyMap = new Map();

        records.forEach(rec => {
            const attributeKey = rec[attributeIndex];

            if (frequencyMap.get(attributeKey)){
                frequencyMap.set(attributeKey, frequencyMap.get(attributeKey) + 1);
            } else {
                frequencyMap.set(attributeKey, 1);
            }
        });
        return frequencyMap;
    }

    buildBagOfWordsFrom (dataSet){

        const frequencyMap = new Map();

        dataSet.forEach(rec => {
            if (frequencyMap.get(rec)){
                frequencyMap.set(rec, frequencyMap.get(rec) + 1);
            } else {
                frequencyMap.set(rec, 1);
            }
        });

        return frequencyMap;
    }

    updateMapCategoryCounter (categoryValue, documentsCounter){

        if (!this._model.mapCounterCategoryDocuments.has(categoryValue)){
            this._model.mapCounterCategoryDocuments.set(categoryValue, documentsCounter);
        } else {
            const lastCount = this._model.mapCounterCategoryDocuments.get(categoryValue);
            this._model.mapCounterCategoryDocuments.set(categoryValue, lastCount + documentsCounter);
        }
    }

    aprioriProb (hipValue){
        const probClass = this._model.mapCounterCategoryDocuments.get(hipValue) / this._model.totalExamplesCounter;
        console.log(`prob clase: ${probClass}`);
        return probClass;
    }

    textConditionalProb (category, messageWords) {

        console.log(`bagWordMapForCategory.size: ${this._model.bagWordMapForCategory.size}`);
        const bagWordMapForCategory = this._model.bagWordMapForCategory.get(category);
        console.log(`attFrequencyMap.size: ${bagWordMapForCategory.size}`);
        const arrayCondProb = [messageWords.length];

        var vocSize = 0;
        for(const [key, value] of this._model.bagWordMapForCategory){
            vocSize += value.size;
        }

        const catSize = bagWordMapForCategory.size;

        console.log(`catSize: ${catSize}`);
        console.log(`vocSize: ${vocSize}`);

        //now determine P( w | c ) for each word `w` in the text
        for (let i = 0; i < messageWords.length; i++) {
            var frequencyByTrain = bagWordMapForCategory.get(messageWords[i]) || 0;
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
        this._model.bayesResultMap.set(category, teoBayesResult);//Set result in schema

        return teoBayesResult;
    }

    hMAP(hValues){
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
        const selectedKey = [...this._model.bayesResultMap].find(([key, val]) => val == value)[0];
        console.log(`selected key:${selectedKey}`);
        return selectedKey;
    }
}

module.exports = NaiveBayes;
