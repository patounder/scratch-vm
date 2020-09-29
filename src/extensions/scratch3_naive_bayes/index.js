const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const NaiveBayes = require('./NaiveBayes');
const Schema = require('./Schema');

class NaiveBayesBlocks {

    constructor (runtime) {
        this.runtime = runtime;
        this.naiveBayes = new NaiveBayes(new Schema());
    }

    getInfo () {
        return {
            id: 'naiveBayesBlocks',
            name: 'Bloques Naive Bayes',
            color1: '#FF1A66',
            blocks: [
                {
                    opcode: 'initConfig',
                    blockType: BlockType.COMMAND,
                    text: 'conf etiquetas hipo [MAIN] atributo [ATTRIBUTES]',
                    arguments: {
                        ATTRIBUTES: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        MAIN: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'train',
                    blockType: BlockType.COMMAND,
                    text: 'entrenar hipo [MAIN_VAL] con datos [DS]',
                    arguments: {
                        DS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        MAIN_VAL: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'teoBayes',
                    blockType: BlockType.REPORTER,
                    text: 'Bayes hip [HIP] dado [NVAL]',
                    arguments: {
                        HIP: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },

                        NVAL: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'hMAP',
                    blockType: BlockType.REPORTER,
                    text: 'hMAX hips [HNAMES] valores [HVALUES]',
                    arguments: {
                        HNAMES: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        HVALUES: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    blockType: BlockType.BUTTON,
                    text: 'Crear DS'
                }
            ],
            menus: {
            }
        };
    }

    initConfig (args){
        console.log(args.ATTRIBUTES);
        const classMain = args.MAIN.toLowerCase();
        const attributes = args.ATTRIBUTES.toLowerCase().split(',');
        this.naiveBayes.initSchema(classMain, attributes);
    }

    train (args){
        const mainValue = args.MAIN_VAL.toLowerCase();
        const dataSet = args.DS.toLowerCase().split(' ').slice();
        const trainningSet = [];
        dataSet.forEach(rec => {
            trainningSet.push(rec.split(',').slice());
        });

        /*
        console.log('mainValue: '+ mainValue);
        console.log('trainingSet: ' + trainingSet[0]);
        */

        this.naiveBayes.train(mainValue, trainningSet);
    }

    probApriori (args){
        const mainValue = args.MAIN_VALUE;
        const value = this.naiveBayes.probApriori(mainValue);
        console.log(value);
        return value;
    }

    probConditional (args){
        const attributeName = args.ATT_NAME;
        const attributeValue = args.ATT_VALUE;
        const mainValue = args.MAIN_VALUE;
        const result = this.naiveBayes.probConditional(attributeName, attributeValue, mainValue);
        console.log(result);
        return result;
    }

    getItemRecord (args){
        const index = args.INDEX;
        // console.log(args.RECORD.name); // indefined
        const recordLikeArray = args.RECORD.split(',').slice();

        return recordLikeArray[index - 1]; // subs because consistency with lists in the code
    }


    teoBayes (args){
        const hip = args.HIP.toLowerCase();
        console.log(`NVAL: ${args.NVAL}`);
        const givenValues = args.NVAL.toLowerCase().split(',');

        const resultConditionalProb = this.naiveBayes.conditionalProb(hip, givenValues);
        const resultAPrioriProb = this.naiveBayes.probApriori(hip);

        return resultConditionalProb * resultAPrioriProb ;
    }

    hMAP(args){
        const hNames = args.HNAMES.toLowerCase().split(' ').slice();
        const hValues = args.HVALUES.toLowerCase().split(' ').slice();

        const selectedHipo = this.naiveBayes.hMAP(hNames, hValues);
        console.log(selectedHipo);
        return selectedHipo;
    }

}

module.exports = NaiveBayesBlocks;
