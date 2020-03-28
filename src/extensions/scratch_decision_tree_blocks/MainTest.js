const ID3 = require('./ID3Class');

class MainTest{

    static main (trainingDataset, recordToClassify){
        const id3Service = new ID3();
        const tree = id3Service.treeGrowth(trainingDataset, trainingDataset.attributes,
            'playtennis', 'root');
        return id3Service.classifyRecord(recordToClassify, tree, trainingDataset.attributes);
    }
}

module.exports = MainTest;
