const DataRecord = require('./DataRecordClass');
const TrainingDataset = require('./TrainingDatasetClass');
const ID3 = require('./ID3Class');
const log = require('../../util/log');

class MainTest{

    static main (trainingDataset, recordToClassify){
        const id3Service = new ID3();

        const weatherTrainingDataset = new TrainingDataset(trainingDataset.attributes, trainingDataset.records);
        const rec = new DataRecord(recordToClassify.values.slice());

        log.log(weatherTrainingDataset);
        log.log(rec);

        const tree = id3Service.treeGrowth(weatherTrainingDataset, weatherTrainingDataset.attributes, 'playtennis');
        log.log(tree);

        return id3Service.classifyRecord(rec, tree, weatherTrainingDataset.attributes);
    }
}

module.exports = MainTest;
