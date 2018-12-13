import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../app';


chai.use(chaiHttp);
const expect = chai.expect;

describe('Video routes', () => {

  it('should be json', () => {
    return chai.request(app).get('/')
      .then(res => {
        expect(res.type).to.eql('application/json');
      });
  });

  it('should have a message prop', () => {
    return chai.request(app).get('/')
      .then(res => {
        expect(res.body.message).to.eql('Welcome to Video repository');
      });
  });

  describe('POST api/videos', () => {
    it('responds with 200', () => {
      return chai.request(app).post('/api/videos')
        .send([
          { id: 1, url: "http://videos.com/video1", description: 'cats video' },
          { id: 2, url: "http://videos.com/video2", description: 'dogs video' },
          { id: 3, url: "http://videos.com/video3", description: 'rabbits video' }
        ])
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
        });
    });
  });
  describe('GET videos', () => {

    it('responds with array', () => {
      return chai.request(app).get('/api/videos')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
        });
    });

    it('find video with id 1', () => {
      return chai.request(app).get('/api/videos')
        .then(res => {
          let video = res.body.find(item => item.id === Number(1));
          expect(video).to.exist;
        });
    });
  });
  describe('GET api/videos/:id', () => {

    it('responds with 200', () => {
      return chai.request(app).get('/api/videos/1')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
        });
    });

    it('should return an object with id 2', () => {
      return chai.request(app).get('/api/videos/2')
        .then(res => {
          expect(res.body.video.url).to.contains('http')
        });
    });

  });

});