const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const NaiveBayes = require('./naive-bayes');
const Schema = require('./schema');

const CATEGORY_DEFAULT_VALUE = 'nombre', CHARACTERISTICS_DEFAULT_VALUE = 'caracteristicas', TRAIN_OPT_CAT_DEFAULT_VALUE = 'opc_cat';

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
                    text: 'clasificar [CLASS_TYPE] categoria [CATEGORY] en base a [CHARACTERISTICS]',
                    arguments: {
                        CLASS_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'classificationTypes'
                        },
                        CATEGORY: {
                            type: ArgumentType.STRING,
                            defaultValue: CATEGORY_DEFAULT_VALUE
                        },
                        CHARACTERISTICS: {
                            type: ArgumentType.STRING,
                            defaultValue: CHARACTERISTICS_DEFAULT_VALUE
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
        const types = [{text: 'texto', value: 'text'}, {text: 'tabla', value: 'table'}];
        return types;
    }

    initConfig (args){
        const argCategory = args.CATEGORY;
        const argsCharacteristic = args.CHARACTERISTICS;
        const argClassType = args.CLASS_TYPE;

        if(argCategory == CATEGORY_DEFAULT_VALUE || argsCharacteristic == CHARACTERISTICS_DEFAULT_VALUE){
            console.log('using default values. Change them');
            return;
        }

        const classMain = this.normalizeString(argCategory);
        const attributes = this.normalizeString(argsCharacteristic).split(',');
        this.naiveBayes.initSchema(classMain, attributes, argClassType);
    }

    train (args){
        const mainValue = this.normalizeString(args.CATEGORY_OPTION);
        const dataSet = this.normalizeString(args.DS).split(' ').slice();
        const nItems = args.N_ITEMS;
        this.naiveBayes.train(mainValue, dataSet, nItems);
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
