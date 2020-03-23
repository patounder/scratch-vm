const DataRecord = require('./DataRecordClass');
const TrainingDataset = require('./TrainingDatasetClass');
const ID3 = require('./ID3Class');
const log = require('../../util/log');

class MainTest{

    static main(trainingDataset, recordToClassify){
        let id3Service = new ID3();

        //return id3Service.getAttributeValues(weatherTrainingDataset, "humidity");
        //return id3Service.entropy(weatherTrainingDataset, "playtennis");
        //return id3Service.getLeafLabel(weatherTrainingDataset, "playtennis");
        //return id3Service.gain(weatherTrainingDataset, "humidity", "playtennis");
        //return id3Service.findBestSplit(weatherTrainingDataset, weatherTrainingDataset.attributes, "playtennis");

        let weatherTrainingDataset = new TrainingDataset(trainingDataset.attributes, trainingDataset.records);
        let rec = new DataRecord(recordToClassify.values.slice());

        log.log(weatherTrainingDataset);
        log.log(rec);

        let tree = id3Service.treeGrowth(weatherTrainingDataset, weatherTrainingDataset.attributes, "playtennis")
        log.log(tree);

        return id3Service.classifyRecord(rec, tree, weatherTrainingDataset.attributes)
    }


   /* static buildWeatherTrainingDataset(){
        let attributes = ["outlook", "temperature", "humidity", "wind", "playtennis"];

        let records = [
            new DataRecord(["sunny", "hot", "high", "weak", "no"]),//
            new DataRecord(["sunny", "hot", "high", "strong", "no"]),
            new DataRecord(["overcast", "hot", "high", "weak", "yes"]),
            new DataRecord(["rain", "mild", "high", "weak", "yes"]),
            new DataRecord(["rain", "cool", "normal", "weak", "yes"]),
            new DataRecord(["rain", "cool", "normal", "strong", "no"]),
            new DataRecord(["overcast", "cool", "normal", "strong", "yes"]),
            new DataRecord(["sunny", "mild", "high", "weak", "no"]),
            new DataRecord(["sunny", "cool", "normal", "weak", "yes"]),
            new DataRecord(["rain", "mild", "normal", "weak", "yes"]),
            new DataRecord(["sunny", "mild", "normal", "strong", "yes"]),
            new DataRecord(["overcast", "mild", "high", "strong", "yes"]),
            new DataRecord(["overcast", "hot", "normal", "weak", "yes"]),
            new DataRecord(["rain", "mild", "high", "strong", "no"])
        ];

        return new TrainingDataset(attributes, records);
    }*/

}

module.exports = MainTest;
