const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const NaiveBayes = require('./naive_bayes');
const Schema = require('./schema');
const Variable = require('../../engine/variable');

const formatMessage = require('format-message');

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
                    opcode: 'trainText',
                    blockType: BlockType.COMMAND,
                    text: 'trainText hipo [MAIN_VAL] con datos [DS] cantidad [N_ITEMS]',
                    arguments: {
                        DS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        MAIN_VAL: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        N_ITEMS: {
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

    trainText (args){
        const mainValue = args.MAIN_VAL.toLowerCase()
        console.log(`mainValue: ${mainValue}`)
        const dataSet = args.DS.toLowerCase().split(' ').slice()
        console.log(`dataSet: ${dataSet}`)
        const nItems = args.N_ITEMS
        console.log(`nItems: ${nItems}`)
        this.naiveBayes.trainForText(mainValue, dataSet, nItems);
    }

    teoBayes (args){
        const hip = args.HIP.toLowerCase();
        console.log(`NVAL: ${args.NVAL}`);
        const givenValues = args.NVAL.toLowerCase().split(',');

        const resultConditionalProb = this.naiveBayes.conditionalProb(hip, givenValues);
        const resultAPrioriProb = this.naiveBayes.aprioriProb(hip);
        const resultProbEvidence = this.naiveBayes.totalProb(givenValues);

        return resultConditionalProb * resultAPrioriProb;
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
