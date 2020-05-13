const expect = require('chai').expect;
const should = require('chai').should();
const Schema = require('../../src/extensions/scratch3_naive_bayes/Schema');

const schema = new Schema('jugar', new Map(), ['cielo', 'temperatura', 'humedad', 'viento'],
    new Map(),0);
const dsYesPlay = [['nublado', 'frio', 'normal', 'si'], ['nublado', 'templado', 'normal', 'si']];
const dsNoPlay = [['lluvioso', 'calor', 'alta', 'si']];


describe('counter', function () {

    it('total count increment', function () {
        schema._totalCountTraining.should.equal(0);
        schema.updateTotalCount(3);
        schema._totalCountTraining.should.equal(3);
    });

    it('total count increment after one time', function () {
        schema.updateTotalCount(6);
        schema._totalCountTraining.should.equal(9);
    });
});

describe('main values map', function () {

    it('should map empty', function () {
        //schema._mainValuesMap.should.be.a.('Map');
        schema._mainValuesMap.size.should.equal(0);
    });

    it('should map with one entry', function () {
        schema.updateMainValuesMap('si', dsYesPlay.length);
        schema._mainValuesMap.size.should.equal(1);
    });
});
