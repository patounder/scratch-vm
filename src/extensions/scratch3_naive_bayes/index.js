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
            blocks: [
                {
                    opcode: 'initConfig',
                    blockType: BlockType.COMMAND,
                    text: 'configuracion atributos [ATTRIBUTES] principal [MAIN]',
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
                    text: 'entrenando con datos [DS] principal [MAIN_VAL]',
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
                    opcode: 'probForClass',
                    blockType: BlockType.REPORTER,
                    text: 'prob gral clase [MAIN_VALUE]',
                    arguments: {
                        MAIN_VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'probConditional',
                    blockType: BlockType.REPORTER,
                    text: 'prob cond valor [ATT_VALUE] atributo [ATT_NAME] principal [MAIN_VALUE]',
                    arguments: {
                        ATT_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        ATT_VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        MAIN_VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                }

            ],
            menus: {
            }
        };
    }

    initConfig (args){
        console.log(args.ATTRIBUTES)
        const classMain = args.MAIN;
        const attributes = args.ATTRIBUTES.split(',');
        this.naiveBayes.initSchema(classMain, attributes);
    }

    train (args){
        const mainValue = args.MAIN_VAL;
        const dataSet = args.DS.split(' ').slice();
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

    probForClass (args){
        const mainValue = args.MAIN_VALUE;
        const value = this.naiveBayes.getProbClass(mainValue);
        console.log(value);
        return value;
    }

    probConditional (args){
        const attributeName = args.ATT_NAME;
        const attributeValue = args.ATT_VALUE;
        const mainValue = args.MAIN_VALUE;
        const result = this.naiveBayes.getProbConditional(attributeName, attributeValue, mainValue);
        console.log(result);
        return result;
    }


}

module.exports = NaiveBayesBlocks;
