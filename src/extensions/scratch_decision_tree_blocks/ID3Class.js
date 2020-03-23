const TrainingDataset = require('./TrainingDatasetClass');
const InternNodeClass = require('./InternNodeClass');
const LeafNodeClass = require('./LeafNodeClass');

class ID3 {

	constructor(){
	}

	treeGrowth(trainingDataset, availableAttributes, targetAttribute, branchValue){
		let root;

		if(this.stoppingCond(trainingDataset, availableAttributes, targetAttribute)){
			let leafLabelValue = this.getLeafLabel(trainingDataset, targetAttribute);
			let emptyChildList = [];
			root = new LeafNodeClass(leafLabelValue, emptyChildList, branchValue);
		} else {
			let testValue = this.findBestSplit(trainingDataset, availableAttributes, targetAttribute);
			let emptyChildList = [];
			root = new InternNodeClass(testValue, emptyChildList, branchValue);

			let availableAttributesUpdated = this.removeElement(availableAttributes.slice(), testValue);
			let attributeValues = this.getAttributeValues(trainingDataset, testValue);

			attributeValues.forEach( attVal => {
				let subTrainingDs = this.getSubTrainingDs(trainingDataset, testValue, attVal);
				let child = null;

				if(subTrainingDs.records.length === 0){
					let leafLabel = this.getLeafLabel(trainingDataset, targetAttribute);
					child = new LeafNodeClass(leafLabel, emptyChildList, attVal);
				} else {
					child = this.treeGrowth(subTrainingDs, availableAttributesUpdated, targetAttribute, attVal);
				}

				root.childList.push(child);
			});
		}

		return root;
	}

	stoppingCond(trainingDataset, attributes, targetAttribute){
		let entropy = this.entropy(trainingDataset, targetAttribute);

		if(entropy === 0){
			return true;
		}

		if(attributes.length === 0){
			return true;
		}

		return false;
	}

	//size purity of training dataset
	entropy(trainingDataset, targetAttribute){
		let entropyVal = 0;
		let valueList = this.getAttributeValues(trainingDataset, targetAttribute);

		valueList.forEach( attributeValue => {
			let occurrences = this.countValues(trainingDataset, targetAttribute, attributeValue);
			let proportion = occurrences/trainingDataset.records.length;
			entropyVal = entropyVal - proportion * (Math.log10(proportion) / Math.log10(2));
		});

		return entropyVal;
	}

	//get possible values for attribute
	getAttributeValues(trainingDataset, targetAttribute){
		// let V : {v|v is a possible outcome of node.test-cond}.
		let attributeValueList = [];
		let attributeIndex = trainingDataset.attributes.indexOf(targetAttribute);

		trainingDataset.records.forEach(rec => {

			let indexValue = rec.values[attributeIndex];

			if(!attributeValueList.includes(indexValue)){
				attributeValueList.push(indexValue);
			}
		});

		return attributeValueList;
	}

	//get counter of record when targetAttribute equal valueAttribute
	countValues(trainingDataset, targetAttribute, valueAttribute){
		return this.getSubTrainingDs(trainingDataset, targetAttribute, valueAttribute)
			.records.length;
	}


	//get subset training dataset where attribute is value
	getSubTrainingDs(trainingDataset, targetAttribute, attributeValue){
		let attributeIndex = trainingDataset.attributes.indexOf(targetAttribute);
		let records = [];

		trainingDataset.records.forEach(function (rec) {
			if(rec.values[attributeIndex] === attributeValue){
				records.push(rec);
			}
		});

		return new TrainingDataset(trainingDataset.attributes, records);
	}

	getLeafLabel(trainingDataset, targetAttribute){
		let count = 0;
		let selectedLabel = "";
		let attributeValueList = this.getAttributeValues(trainingDataset, targetAttribute);
		let attributeIndex = trainingDataset.attributes.indexOf(targetAttribute);

		attributeValueList.forEach(value => {
			let counterRecord = trainingDataset.records.filter(rec => {
				return value === rec.values[attributeIndex];
			}).length;

			if(counterRecord > count){
				selectedLabel = value;
				count = counterRecord;
			}
		});

		return selectedLabel;
	}

	//select best attribute (effectiveness) to getLeafLabel training data
	findBestSplit(trainingDataset, attributes, targetAttribute){
		let selectedAttribute = "";
		let informationGain = 0;
		let attributesWithoutTarget = this.removeElement(attributes.slice(), targetAttribute);

		attributesWithoutTarget.forEach( att => {
			let attributeInformationGain = this.gain(trainingDataset, att, targetAttribute);

			if(attributeInformationGain > informationGain){
				selectedAttribute = att;
				informationGain = attributeInformationGain;
			}
		});

		return selectedAttribute;
	}

	//calc information gain for selected attribute by target attribute
	gain(trainingDataset, selectedAttribute, targetAttribute){
		let gralEntropy = this.entropy(trainingDataset, targetAttribute);
		let summa = 0;
		let attributeValues = this.getAttributeValues(trainingDataset, selectedAttribute);

		attributeValues.forEach(attVal => {
			let trainingSubset = this.getSubTrainingDs(trainingDataset, selectedAttribute, attVal);
			let subsetEntropy = this.entropy(trainingSubset, targetAttribute);
			let proportion = trainingSubset.records.length / trainingDataset.records.length;
			summa = summa + proportion * subsetEntropy;
		});

		return gralEntropy - summa;
	}

	removeElement(baseArray, element){
		let indexToDelete = baseArray.findIndex(att => { return att === element});
		baseArray.splice(indexToDelete, 1);
		return baseArray.slice();
	}

	//tree search for record
	classifyRecord(record, tree, attributes){

	    if(tree instanceof LeafNodeClass){
			return tree.valueLabel;
		} else {
			let testAttribute = tree.testAttribute;
			let indexAtt = attributes.indexOf(testAttribute);
			let valueAtt = record.values[indexAtt];

			let child = tree.childList.find(child => {
				return valueAtt === child.branchValue
			});

			if(child !== null){
				return this.classifyRecord(record, child, attributes);
			} else {
				return "Error";
			}
		}
	}
}


module.exports = ID3;
