const should = require('chai').should();
const expect = require('chai').expect;
const FrequencyTableClass = require('../../src/extensions/scratch3_naive_bayes/FrequencyTableClass');

const dsYesPlay = [['nublado', 'frio', 'normal', 'si'], ['nublado', 'templado', 'normal', 'si']];
const dsNoPlay = [['lluvioso', 'calor', 'alta', 'si']];

var frequencyTable = new FrequencyTableClass('atributo1', 0, new Map(), []);

describe('updateFrequencyMap', function () {

    it('should set values in frequencyTable', function () {
        frequencyTable.attributesValues.length.should.equal(0);
        frequencyTable.updateFrequencyMap('si', dsYesPlay);
        frequencyTable.frequencyMap.get('si').size.should.equal(1);
        frequencyTable.frequencyMap.get('si').get('nublado').should.equal(2);
        frequencyTable.tableName.should.equal('atributo1');
        frequencyTable.recordIndex.should.equal(0);
        frequencyTable.attributesValues.length.should.equal(1);
    });

    it('should set new values in frequency map for dsNoPlay', function () {
        frequencyTable.updateFrequencyMap('no', dsNoPlay);
        frequencyTable.frequencyMap.get('no').size.should.equal(1);
        expect(frequencyTable.frequencyMap.get('no').get('nublado')).to.be.an('undefined');
        frequencyTable.frequencyMap.get('no').get('lluvioso').should.equal(1);
        frequencyTable.tableName.should.equal('atributo1');
        frequencyTable.recordIndex.should.equal(0);
        frequencyTable.attributesValues.length.should.equal(2);
    });
});
