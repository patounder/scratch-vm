const expect = require('chai').expect;
const should = require('chai').should();

const NaiveBayes = require('../../src/extensions/scratch3_naive_bayes/NaiveBayes');
const Schema = require('../../src/extensions/scratch3_naive_bayes/Schema');

const dsYesPlay = [['nublado', 'frio', 'normal', 'si']];
const dsNoPlay = [['lluvioso', 'calor', 'alta', 'si']];
const remainingAttributes = ['cielo', 'temperatura', 'humedad', 'viento'];

const naiveBayes = new NaiveBayes(new Schema());

describe('dummy', function() {
    it('should be 4', function () {
        expect(naiveBayes.sumDummy(1,3)).to.equal(4);
    });

    it('should be zero', function () {
        expect(naiveBayes.sumDummy(-10,10)).to.equal(0);
    });
});

describe('init schema', function () {
    it('empty or undefined object', function () {
        expect(naiveBayes._schema._mainAttribute).to.be.an('undefined');
        expect(naiveBayes._schema._remainingAttributes).to.be.an('undefined');
        expect(naiveBayes._schema.mainValuesMap).to.be.an('undefined');
        expect(naiveBayes._schema._totalCountTraining).to.be.an('undefined')
        expect(naiveBayes._schema._frequencyTablesMap).to.be.an('undefined');
    });

    it('should initalize schema', function () {
        naiveBayes.initSchema('jugar', remainingAttributes);
        expect(naiveBayes._schema._mainAttribute).to.equal('jugar');
        expect(naiveBayes._schema._remainingAttributes.length).to.equal(4);
        expect(naiveBayes._schema.mainValuesMap.size).to.equal(0);
        expect(naiveBayes._schema._totalCountTraining).to.equal(0);
        expect(naiveBayes._schema._frequencyTablesMap.size).to.equal(4);

        const ftCielo = naiveBayes._schema.frequencyTablesMap.get('cielo');
        expect(ftCielo.tableName).to.equal('cielo');
        expect(ftCielo.recordIndex).to.equal(0);
        expect(ftCielo.frequencyMap.size).to.equal(0);

        const ftViento = naiveBayes._schema.frequencyTablesMap.get('viento');
        expect(ftViento.tableName).to.equal('viento');
        expect(ftViento.recordIndex).to.equal(3);
        expect(ftViento.frequencyMap.size).to.equal(0);

    });
});



describe('train model', function () {
    it('train with yes examples', function () {
        naiveBayes.initSchema('jugar', remainingAttributes);
        naiveBayes.train('si', dsYesPlay);
        naiveBayes._schema.totalCountTraining.should.equal(1);
        naiveBayes._schema.mainValuesMap.size.should.equal(1);

        const ftCielo = naiveBayes._schema.frequencyTablesMap.get('cielo');
        expect(ftCielo.tableName).to.equal('cielo');
        expect(ftCielo.recordIndex).to.equal(0);
        expect(ftCielo.frequencyMap.size).to.equal(1);
        expect(ftCielo.frequencyMap.get('si').size).to.equal(1);
        expect(ftCielo.frequencyMap.get('si').get('nublado')).to.equal(2);
        expect(ftCielo.attributesValues.length).to.equal(1);
    });

    it('train with no examples', function () {
        naiveBayes.train('no', dsNoPlay);
        naiveBayes._schema._totalCountTraining.should.equal(3);
        naiveBayes._schema._mainValuesMap.size.should.equal(2);
    });
});
