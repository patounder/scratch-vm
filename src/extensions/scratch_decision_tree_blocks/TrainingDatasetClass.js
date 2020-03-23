class TrainingDataset {

	constructor(attributes, records){
		this._attributes = attributes;
		this._records = records;
	}

	get attributes() {
		return this._attributes;
	}

	set attributes(value) {
		this._attributes = value;
	}

	get records() {
		return this._records;
	}

	set records(value) {
		this._records = value;
	}
}


module.exports = TrainingDataset;