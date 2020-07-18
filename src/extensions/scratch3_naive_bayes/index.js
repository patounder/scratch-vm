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
                    text: 'config nombres: hipotesis [MAIN] atributos [ATTRIBUTES]',
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
                    text: 'entrenar hipotesis [MAIN_VAL] con datos [DS]',
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
                    opcode: 'probApriori',
                    blockType: BlockType.REPORTER,
                    text: 'prob a priori hipotesis [MAIN_VALUE]',
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
                    text: 'prob cond atributo [ATT_NAME] valor [ATT_VALUE] dada h [MAIN_VALUE]',
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
                },
                {
                    opcode: 'getItemRecord',
                    blockType: BlockType.REPORTER,
                    text: 'item [INDEX] de [RECORD]',
                    arguments: {
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        RECORD: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'hMAP',
                    blockType: BlockType.REPORTER,
                    text: 'hMAP names [HNAMES] values [HVALUES]',
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

    hMAP(args){
        const hNames = args.HNAMES.split(' ').slice();
        const hValues = args.HVALUES.split(' ').slice();

        const selectedHipo = this.naiveBayes.hMAP(hNames, hValues);
        //console.log(selectedHipo);
        return selectedHipo;
    }

}

module.exports = NaiveBayesBlocks;
