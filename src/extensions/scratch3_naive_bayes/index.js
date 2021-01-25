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
        const classMain = this.normalizeString(args.MAIN);
        const attributes = this.normalizeString(args.ATTRIBUTES).split(',');
        const classType = args.CLASS_TYPE;
        console.log(`classType: ${classType}`)
        this.naiveBayes.initSchema(classMain, attributes, classType);
    }

    train (args){
        const mainValue = this.normalizeString(args.MAIN_VAL);
        const dataSet = this.normalizeString(args.DS).split(' ').slice();
        const nItems = args.N_ITEMS;
        this.naiveBayes.train(mainValue, dataSet, nItems);
    }

    bayes (args){
        const hip = this.normalizeString(args.HIP);
        const newValue = this.normalizeString(args.NVAL);

        return this.naiveBayes.teoBayes(hip, newValue);
    }

    hMAP(args){
        const hValues = this.normalizeString(args.HVALUES).split(' ').slice();
        const selectedHip = this.naiveBayes.hMAP(hValues);
        console.log(selectedHip);
        return selectedHip;
    }

    normalizeString (myStr){
        return myStr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

}

module.exports = NaiveBayesBlocks;
