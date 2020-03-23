const NodeClass = require('./NodeClass');

class InternNodeClass extends NodeClass{

    constructor(testAttribute, childList, classifyValue){
        super(childList, classifyValue);
        this._classifyValue = classifyValue;
        this._testAttribute = testAttribute;
    }

    get testAttribute() {
        return this._testAttribute;
    }

    set testAttribute(value) {
        this._testAttribute = value;
    }

    get classifyValue() {
        return this._classifyValue;
    }

    set classifyValue(value) {
        this._classifyValue = value;
    }
}

module.exports = InternNodeClass;