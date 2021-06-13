const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const NaiveBayes = require('./naive-bayes');
const Model = require('./model');

const CATEGORY_DEFAULT_VALUE = 'nombre', CHARACTERISTICS_DEFAULT_VALUE = 'caracteristicas', TRAIN_OPT_CAT_DEFAULT_VALUE = 'opc_cat';

class NaiveBayesBlocks {

    constructor (runtime) {
        this.runtime = runtime;
        this.naiveBayes = new NaiveBayes();
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
                    text: 'clasificador [NAME]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: CATEGORY_DEFAULT_VALUE
                        }
                    }
                },
                {
                    opcode: 'train',
                    blockType: BlockType.COMMAND,
                    text: 'entrenar categoria opcion [CATEGORY_OPTION] con datos [DS] cantidad [N_ITEMS]',
                    arguments: {
                        CATEGORY_OPTION: {
                            type: ArgumentType.STRING,
                            defaultValue: TRAIN_OPT_CAT_DEFAULT_VALUE
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
                            defaultValue: TRAIN_OPT_CAT_DEFAULT_VALUE
                        },
                        NVAL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ej_nuevo'
                        }
                    }
                },
                {
                    opcode: 'maxCategoryFrom',
                    blockType: BlockType.REPORTER,
                    text: 'maxima categoria entre valores [HVALUES]',
                    arguments: {
                        HVALUES: {
                            type: ArgumentType.STRING,
                            defaultValue: 'lista_bayes'
                        }
                    }
                }
            ]
        };
    }

    initConfig (args){
        const argName = args.NAME;

        if(argName == CATEGORY_DEFAULT_VALUE){
            console.log('using default values. Change them');
            return;
        }

        const name = this.normalizeString(argName);
        this.naiveBayes.initModel(name);
    }

    train (args){
        const categoryValue = this.normalizeString(args.CATEGORY_OPTION);
        const dataSet = this.normalizeString(args.DS).split(' ').slice();
        const nItems = args.N_ITEMS;
        this.naiveBayes.train(categoryValue, dataSet, nItems);
    }

    bayes (args){

        const hipArg = args.HIP;
        const nvalArg = args.NVAL;
        if ((hipArg == CATEGORY_DEFAULT_VALUE) || (typeof nvalArg === 'undefined')){

            return;
        }
        console.log(`hipArg: ${hipArg}`);
        console.log(`nvalArg: ${nvalArg}`);

        const hip = this.normalizeString(hipArg);
        const newValue = this.normalizeString(nvalArg);

        return this.naiveBayes.teoBayes(hip, newValue);
    }

    maxCategoryFrom(args){
        const hValues = this.normalizeString(args.HVALUES).split(' ').slice();
        const selectedHip = this.naiveBayes.maxCategoryFrom(hValues);
        console.log(selectedHip);
        return selectedHip;
    }

    normalizeString (myStr){
        return myStr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

}

module.exports = NaiveBayesBlocks;
