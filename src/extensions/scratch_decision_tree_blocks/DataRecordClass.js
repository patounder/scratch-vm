class DataRecord {

    constructor (values){
        this._values = values;// array
    }

    get values () {
        return this._values;
    }

    set values (value) {
        this._values = value;
    }
}

module.exports = DataRecord;
