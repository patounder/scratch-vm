class NodeClass{

    constructor(childList, branchValue){
        this._childList = childList;
        this._branchValue = branchValue;
    }

    get childList() {
        return this._childList;
    }

    set childList(value) {
        this._childList = value;
    }

    get branchValue() {
        return this._branchValue;
    }

    set branchValue(value) {
        this._branchValue = value;
    }


}

module.exports = NodeClass