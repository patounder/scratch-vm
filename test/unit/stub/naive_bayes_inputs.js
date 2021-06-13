class NaiveBayesInputsStub {

    constructor () {
        this._happyTrainingSetText = [
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

        this._sadTrainingSetText = [
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
        ];
    }

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
}

module.exports = NaiveBayesInputsStub
