const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

class Scratch3NewBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'newblocks',
            name: 'New Blocks',
            blocks: [
                {
                    opcode: 'writeLog',
                    blockType: BlockType.COMMAND,
                    text: 'command [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'hello',
                            menu: 'options'
                        }
                    }
                },
                {
                    opcode: 'getReporter',
                    blockType: BlockType.REPORTER,
                    text: 'reporter [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'test',
                            menu: 'options'
                        }
                    }
                },
                {
                    opcode: 'getBooleanReporter',
                    blockType: BlockType.BOOLEAN,
                    text: 'boolean [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'true',
                            menu: 'optionsBoolean'
                        }
                    }
                }
            ],
            menus: {
                options: {
                    acceptReporters: true,
                    items: [{
                        text: 'test',
                        value: 'test'
                    },
                    {
                        text: 'hello',
                        value: 'hello'
                    }]
                },
                optionsBoolean: {
                    acceptReporters: true,
                    items: [{
                        text: 'true',
                        value: true
                    },
                    {
                        text: 'false',
                        value: false
                    }]
                }

            }
        };
    }

    writeLog (args) {
        const text = Cast.toString(args.TEXT);

        class NodeTree {
            constructor (childList, branchValue) {
                this.childList = childList;
                this.branchValue = branchValue;
            }
        }

        const node = new NodeTree(text, text);

        log.log(`texto: ${text}`);
        log.log(`node: ${node}`);
    }

    getReporter (args) {
        return `Argument TEXT is ${args.TEXT}`;
    }

    getBooleanReporter (args) {
        return args.TEXT === 'true';
    }
}

module.exports = Scratch3NewBlocks;
