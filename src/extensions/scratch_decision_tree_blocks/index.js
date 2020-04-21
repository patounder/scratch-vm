const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Variable = require('../../engine/variable');
const log = require('../../util/log');
const id3Main = require('./MainTest');
const DataRecord = require('./DataRecordClass');
const TrainingDataset = require('./TrainingDatasetClass');

class ID3Blocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'id3Blocks',
            name: 'id3 blocks',
            blocks: [
                {
                    opcode: 'classify',
                    blockType: BlockType.COMMAND,
                    text: 'classify [DS][REC]',
                    arguments: {
                        REC: {
                            type: DataRecord,
                            defaultValue: 'record'
                        },
                        DS: {
                            type: TrainingDataset,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'createRecord',
                    blockType: BlockType.REPORTER,
                    text: 'record [VALUES]',
                    arguments: {
                        VALUES: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'buildTrainingDs',
                    blockType: BlockType.REPORTER,
                    text: 'training ds [ATTRIBUTES][RECORDS]',
                    arguments: {
                        ATTRIBUTES: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        RECORDS: {
                            type: Variable.LIST_TYPE,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'stoppingCond',
                    blockType: BlockType.REPORTER,
                    text: 'finaliza crecimiento [TRAINING_DS][TARGET_ATT]',
                    arguments: {
                        TRAINING_DS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        TARGET_ATT: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'newLeafNode',
                    blockType: BlockType.REPORTER,
                    text: 'nodo hoja [LEAF_LABEL][BRANCH_VALUE]',
                    arguments: {
                        LEAF_LABEL: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        BRANCH_VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }

                    }
                },
                {
                    opcode: 'getLeafLabel',
                    blockType: BlockType.REPORTER,
                    text: 'obtener etiqueta [TRAINING_DS][TARGET_ATT]',
                    arguments: {
                        TRAINING_DS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        TARGET_ATT: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'findBestSplit',
                    blockType: BlockType.REPORTER,
                    text: 'encuentra mejor divisor [TRAINING_DS][TARGET_ATT]',
                    arguments: {
                        TRAINING_DS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        TARGET_ATT: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'removeElement',
                    blockType: BlockType.REPORTER,
                    text: 'quitar atributo [TRAINING_DS][VALUE_NODE]',
                    arguments: {
                        TRAINING_DS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        VALUE_NODE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'getAttributeValues',
                    blockType: BlockType.REPORTER,
                    text: 'obtener atributos [TRAINING_DS][VALUE_NODE]',
                    arguments: {
                        TRAINING_DS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        VALUE_NODE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'getSubTrainingDs',
                    blockType: BlockType.REPORTER,
                    text: 'subconjuto entrenamiento [TRAINING_DS][VALUE_NODE][NODE]',
                    arguments: {
                        TRAINING_DS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        VALUE_NODE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        NODE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'newInternNode',
                    blockType: BlockType.REPORTER,
                    text: 'nodo interno [VALUE_NODE][CHILD_LIST][BRANCH_VALUE]',
                    arguments: {
                        VALUE_NODE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        CHILD_LIST: {
                            type: Variable.LIST_TYPE,
                            defaultValue: ''
                        },
                        BRANCH_VALUE: {
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

    classify (args){
        const classifyValue = id3Main.main(args.DS, args.REC);
        log.log(`clasificación: ${classifyValue}`);
    }

    createRecord (args){
        return new DataRecord(args.VALUES.split(','));
    }

    buildTrainingDs (args){
        const attributes = args.ATTRIBUTES.split(',');

        const inputList = args.RECORDS.split(' ').slice();
        const records = [];

        inputList.forEach(input => {
            records.push(new DataRecord(input.split(',').slice()));
        });
        return new TrainingDataset(attributes, records);
    }

    stoppingCond (){}

    newLeafNode (){}

    getLeafLabel (){}

    findBestSplit (){}

    removeElement (){}

    getAttributeValues (){}

    getSubTrainingDs (){}

    newInternNode (){}
}

module.exports = ID3Blocks;
