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
}

module.exports = ID3Blocks;
