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
                    text: 'configuracion clase[CLASS_MAIN] atributos[ATTRIBUTES]',
                    arguments: {
                        CLASS_MAIN: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        ATTRIBUTES: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'train',
                    blockType: BlockType.COMMAND,
                    text: 'entrenar datos [DS] clase [CLASS_ID]',
                    arguments: {
                        DS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        CLASS_ID: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'probForClass',
                    blockType: BlockType.REPORTER,
                    text: 'probabilidad clase [CLASS_ID]',
                    arguments: {
                        CLASS_ID: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'probConditional',
                    blockType: BlockType.REPORTER,
                    text: 'probabilidad de [VAL_REC] dada [CLASS_ID]',
                    arguments: {
                        CLASS_ID: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        VAL_REC: {
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
        const classMain = args.CLASS_MAIN;
        const attributes = args.ATTRIBUTES.split(',');
        this.naiveBayes.initSchema(classMain, attributes);
    }

    train (args){
        const mainValue = args.CLASS_ID;
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

    probForClass (){
        console.log(this.naiveBayes.sumDummy(3, 6));
    }

    probConditional (){}
}

module.exports = NaiveBayesBlocks;
