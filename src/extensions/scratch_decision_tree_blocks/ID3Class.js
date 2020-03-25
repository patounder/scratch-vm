const TrainingDataset = require('./TrainingDatasetClass');
const InternNodeClass = require('./InternNodeClass');
const LeafNodeClass = require('./LeafNodeClass');

class ID3 {

    treeGrowth (trainingDataset, availableAttributes, targetAttribute, branchValue){
        let root;

        if (this.stoppingCond(trainingDataset, availableAttributes, targetAttribute)){
            const leafLabelValue = this.getLeafLabel(trainingDataset, targetAttribute);
            const emptyChildList = [];
            root = new LeafNodeClass(leafLabelValue, emptyChildList, branchValue);
        } else {
            const testValue = this.findBestSplit(trainingDataset, availableAttributes, targetAttribute);
            const emptyChildList = [];
            root = new InternNodeClass(testValue, emptyChildList, branchValue);

            const availableAttributesUpdated = this.removeElement(availableAttributes.slice(), testValue);
            const attributeValues = this.getAttributeValues(trainingDataset, testValue);

            attributeValues.forEach(attVal => {
                const subTrainingDs = this.getSubTrainingDs(trainingDataset, testValue, attVal);
                let child = null;

                if (subTrainingDs.records.length === 0){
                    const leafLabel = this.getLeafLabel(trainingDataset, targetAttribute);
                    child = new LeafNodeClass(leafLabel, emptyChildList, attVal);
                } else {
                    child = this.treeGrowth(subTrainingDs, availableAttributesUpdated, targetAttribute, attVal);
                }

                root.childList.push(child);
            });
        }

        return root;
    }

    stoppingCond (trainingDataset, attributes, targetAttribute){
        const entropy = this.entropy(trainingDataset, targetAttribute);

        if (entropy === 0){
            return true;
        }

        return attributes.length === 0;
    }

    // size purity of training dataset
    entropy (trainingDataset, targetAttribute){
        let entropyVal = 0;
        const valueList = this.getAttributeValues(trainingDataset, targetAttribute);

        valueList.forEach(attributeValue => {
            const occurrences = this.countValues(trainingDataset, targetAttribute, attributeValue);
            const proportion = occurrences / trainingDataset.records.length;
            // eslint-disable-next-line no-mixed-operators
            entropyVal = entropyVal - proportion * (Math.log10(proportion) / Math.log10(2));
        });

        return entropyVal;
    }

    // get possible values for attribute
    getAttributeValues (trainingDataset, targetAttribute){
        // let V : {v|v is a possible outcome of node.test-cond}.
        const attributeValueList = [];
        const attributeIndex = trainingDataset.attributes.indexOf(targetAttribute);

        trainingDataset.records.forEach(rec => {

            const indexValue = rec.values[attributeIndex];

            if (!attributeValueList.includes(indexValue)){
                attributeValueList.push(indexValue);
            }
        });

        return attributeValueList;
    }

    // get counter of record when targetAttribute equal valueAttribute
    countValues (trainingDataset, targetAttribute, valueAttribute){
        return this.getSubTrainingDs(trainingDataset, targetAttribute, valueAttribute)
            .records.length;
    }


    // get subset training dataset where attribute is value
    getSubTrainingDs (trainingDataset, targetAttribute, attributeValue){
        const attributeIndex = trainingDataset.attributes.indexOf(targetAttribute);
        const records = [];

        trainingDataset.records.forEach(rec => {
            if (rec.values[attributeIndex] === attributeValue){
                records.push(rec);
            }
        });

        return new TrainingDataset(trainingDataset.attributes, records);
    }

    getLeafLabel (trainingDataset, targetAttribute){
        let count = 0;
        let selectedLabel = '';
        const attributeValueList = this.getAttributeValues(trainingDataset, targetAttribute);
        const attributeIndex = trainingDataset.attributes.indexOf(targetAttribute);

        attributeValueList.forEach(value => {
            const counterRecord = trainingDataset.records.filter(rec => value === rec.values[attributeIndex]).length;

            if (counterRecord > count){
                selectedLabel = value;
                count = counterRecord;
            }
        });

        return selectedLabel;
    }

    // select best attribute (effectiveness) to getLeafLabel training data
    findBestSplit (trainingDataset, attributes, targetAttribute){
        let selectedAttribute = '';
        let informationGain = 0;
        const attributesWithoutTarget = this.removeElement(attributes.slice(), targetAttribute);

        attributesWithoutTarget.forEach(att => {
            const attributeInformationGain = this.gain(trainingDataset, att, targetAttribute);

            if (attributeInformationGain > informationGain){
                selectedAttribute = att;
                informationGain = attributeInformationGain;
            }
        });

        return selectedAttribute;
    }

    // calc information gain for selected attribute by target attribute
    gain (trainingDataset, selectedAttribute, targetAttribute){
        const gralEntropy = this.entropy(trainingDataset, targetAttribute);
        let summa = 0;
        const attributeValues = this.getAttributeValues(trainingDataset, selectedAttribute);

        attributeValues.forEach(attVal => {
            const trainingSubset = this.getSubTrainingDs(trainingDataset, selectedAttribute, attVal);
            const subsetEntropy = this.entropy(trainingSubset, targetAttribute);
            const proportion = trainingSubset.records.length / trainingDataset.records.length;
            // eslint-disable-next-line no-mixed-operators
            summa = summa + proportion * subsetEntropy;
        });

        return gralEntropy - summa;
    }

    removeElement (baseArray, element){
        const indexToDelete = baseArray.findIndex(att => att === element);
        baseArray.splice(indexToDelete, 1);
        return baseArray.slice();
    }

    // tree search for record
    classifyRecord (record, tree, attributes){

        if (tree instanceof LeafNodeClass){
            return tree.valueLabel;
        }

        const testAttribute = tree.testAttribute;
        const indexAtt = attributes.indexOf(testAttribute);
        const valueAtt = record.values[indexAtt];

        const child = tree.childList.find(c => valueAtt === c.branchValue);

        if (child !== null){
            return this.classifyRecord(record, child, attributes);
        }
        return 'Error';
    }
}


module.exports = ID3;
