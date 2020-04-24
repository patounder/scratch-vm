const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const NaiveBayes = require('./NaiveBayes');
const Schema = require('./Schema');

class NaiveBayesBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        this._nbObj = new NaiveBayes(new Schema());
    }

    getInfo () {
        return {
            id: 'naiveBayesBlocks',
            name: 'Bloques Naive Bayes',
            blocks: [
                {
                    opcode: 'train',
                    blockType: BlockType.COMMAND,
                    text: 'entrenar datos [DS] clase [ID_CLASS]',
                    arguments: {
                        DS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        ID_CLASS: {
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
    train (){}

    probForClass (){
        console.log(this._nbObj.sumDummy(3, 6));
    }

    probConditional (){}
}

module.exports = NaiveBayesBlocks;
