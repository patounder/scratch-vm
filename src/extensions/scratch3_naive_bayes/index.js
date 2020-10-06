const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const NaiveBayes = require('./naive_bayes');
const Schema = require('./schema');

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
                    text: 'conf etiquetas hipo [MAIN] atributo [ATTRIBUTES] tipo classifica [CLASS_TYPE]',
                    arguments: {
                        ATTRIBUTES: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        MAIN: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        CLASS_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'classificationTypes'
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
                    opcode: 'bayes',
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
                classificationTypes: {
                    items: this.getClassTypes()
                }
            }
        };
    }

    getClassTypes (){
        const types = [{text: 'texto', value: 'text'}, {text: 'tabla', value: 'table'}]
        return types
    }

    initConfig (args){
        const classMain = args.MAIN.toLowerCase();
        const attributes = args.ATTRIBUTES.toLowerCase().split(',');
        const classType = args.CLASS_TYPE;
        console.log(`classType: ${classType}`)
        this.naiveBayes.initSchema(classMain, attributes, classType);
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

    bayes (args){
        const hip = args.HIP.toLowerCase()
        const givenValues = args.NVAL.toLowerCase()

        return this.naiveBayes.teoBayes(hip, givenValues)
    }

    hMAP(args){
        const hNames = args.HNAMES.toLowerCase().split(' ').slice();
        const hValues = args.HVALUES.toLowerCase().split(' ').slice();

        const selectedHip = this.naiveBayes.hMAP(hNames, hValues);
        console.log(selectedHip);
        return selectedHip;
    }

}

module.exports = NaiveBayesBlocks;
