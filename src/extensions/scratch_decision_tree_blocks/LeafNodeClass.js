const NodeClass = require('./NodeClass');

class LeafNodeClass extends NodeClass{

    constructor(valueLabel, childList, branchValue){
        super(childList, branchValue);
        this._valueLabel = valueLabel;
    }

    get valueLabel() {
        return this._valueLabel;
    }

    set valueLabel(value) {
        this._valueLabel = value;
    }
}

module.exports = LeafNodeClass