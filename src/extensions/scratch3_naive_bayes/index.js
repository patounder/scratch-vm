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
            name: 'Bayes Ingenuo',
            color1: '#FF1A66',
            blocks: [
                {
                    opcode: 'initConfig',
                    blockType: BlockType.COMMAND,
                    text: 'clasifica [MAIN] tipo [CLASS_TYPE] en base a [ATTRIBUTES]',
                    arguments: {
                        MAIN: {
                            type: ArgumentType.STRING,
                            defaultValue: 'categoria'
                        },
                        CLASS_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'classificationTypes'
                        },
                        ATTRIBUTES: {
                            type: ArgumentType.STRING,
                            defaultValue: 'caracteristica'
                        }
                    }
                },
                {
                    opcode: 'train',
                    blockType: BlockType.COMMAND,
                    text: 'entrena categoria [MAIN_VAL] con datos [DS] cantidad [N_ITEMS]',
                    arguments: {
                        MAIN_VAL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'valor_cat'
                        },
                        DS: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ejemplos'
                        },
                        N_ITEMS: {
                        }
                    }
                },
                {
                    opcode: 'bayes',
                    blockType: BlockType.REPORTER,
                    text: 'bayes categoria [HIP] dado [NVAL]',
                    arguments: {
                        HIP: {
                            type: ArgumentType.STRING,
                            defaultValue: 'valor_cat'
                        },
                        NVAL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ej_nuevo'
                        }
                    }
                },
                {
                    opcode: 'hMAP',
                    blockType: BlockType.REPORTER,
                    text: 'maxima categoria entre valores [HVALUES]',
                    arguments: {
                        HVALUES: {
                            type: ArgumentType.STRING,
                            defaultValue: 'lista_bayes'
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
        const hValues = args.HVALUES.toLowerCase().split(' ').slice();

        const selectedHip = this.naiveBayes.hMAP(hValues);
        console.log(selectedHip);
        return selectedHip;
    }

}

module.exports = NaiveBayesBlocks;
