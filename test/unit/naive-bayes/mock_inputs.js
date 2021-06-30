class NaiveBayesInputsStub {

    static getHappyTrainingSetText(){
        return [
            'estas muy grande',
            'haces todo bien',
            'eres increible',
            'muy bien hecho',
            'muchas gracias',
            'eres magnifica',
            'eres bueno',
            'eres una buena persona',
            'te quiero',
            'lo hiciste bien',
            'quiero estar contigo',
            'eres una ganadora'];
    }

    static getSadTrainingSetText(){
        return [
            'no sirves para nada',
            'lo hiciste mal',
            'eres una mala persona',
            'eres malvado',
            'mal hecho',
            'no hay nada que agradecer',
            'eres malo',
            'no te quiero',
            'haces todo mal',
            'ya no quiero estar contigo',
            'no lo hiciste bien',
            'eres un perdedor'
        ]
    }

    static getArrayHappyExamples(){
        return this.getHappyTrainingSetText().join().replace(new RegExp(' ', 'g'), ',')
            .split(',').slice();
    }

    static getLengthArrayHappy(){
        return this.getHappyTrainingSetText().length;
    }


    static getArraySadExamples(){
        return this.getSadTrainingSetText().join().replace(new RegExp(' ', 'g'), ',')
            .split(',').slice();
    }

    static getLengthArraySad(){
        return this.getSadTrainingSetText().length;
    }

    static getArrayEmptyExamples(){
        return [];
    }

    static getLengthArrayEmpty(){
        return this.getArrayEmptyExamples().length;
    }

    static getArrayVocabulary(){
        return ['estas','muy','grande','haces','todo','bien','eres','increible','hecho','muchas','gracias','magnifica',
            'bueno','una','buena','persona','te','lo','hiciste','quiero','estar','contigo','ganadora','no','sirves',
            'para','nada','mal','mala','malvado','hay','que','agradecer','malo','ya','un','perdedor'];
    }
}

module.exports = NaiveBayesInputsStub
