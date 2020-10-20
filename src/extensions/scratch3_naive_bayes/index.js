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
            id: 'naivebayes',
            name: 'Naive Bayes',
            color1: '#FF1A66',
            blocks: [
                {
                    opcode: 'initConfig',
                    blockType: BlockType.COMMAND,
                    text: 'classifica [CLASS_TYPE] hipotesis [MAIN] atributo(s) [ATTRIBUTES]',
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
                    text: 'entrena hipotesis [MAIN_VAL] con datos [DS] cantidad [N_ITEMS]',
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
                    text: 'bayes para hipotesis [HIP] dado [NVAL]',
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
                    text: 'maxima hipotesis entre [HNAMES] valores [HVALUES]',
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
        const nItems = args.N_ITEMS
        this.naiveBayes.train(mainValue, dataSet, nItems);
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
