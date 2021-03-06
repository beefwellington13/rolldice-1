var hubot = require('hubot');
var Helper = require('hubot-test-helper');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var helper = new Helper('../index.coffee');

describe('rolldice', function(){
  var room = null;
  beforeEach(function(){
    room = helper.createRoom({httpd:false});
  });
  afterEach(function(){
    try {
      room.destroy();
    }catch(ex){}
  });
  
  it('should roll some default dice', function(){
    return room.user.say('user1', '@hubot roll').then(function(){
      expect(room.messages).to.have.length(2);
      expect(room.messages[0][0]).to.equal('user1');
      expect(room.messages[0][1]).to.equal('@hubot roll');
      expect(room.messages[1][0]).to.equal('hubot');
      expect(room.messages[1][1]).to.be.a('string');
      expect(room.messages[1][1]).to.match(/@user1 \d rolls: 1d6\(\d=\d\)/);
    });
  });
  
  it('should not attempt an invalid roll', function(){
    return room.user.say('user1', '@hubot roll something').then(function(){
      expect(room.messages).to.deep.equal([
        ['user1', '@hubot roll something'],
        ['hubot', '@user1 invalid dice roll']
      ]);
    });
  });
  
  it('should respond to valid complex rolls', function(){
    return room.user.say('user1', '@hubot roll 4d6k2 + 3d10-8').then(function(){
      expect(room.messages).to.have.length(2);
      expect(room.messages[0]).to.deep.equal(['user1', '@hubot roll 4d6k2 + 3d10-8'])
      expect(room.messages[1]).to.have.length(2);
      expect(room.messages[1][0]).to.equal('hubot');
      expect(room.messages[1][1]).to.match(/@user1 \d+ rolls: 4d6k2\(\d+=\d\+\d\) \+ 3d10\(\d+=(?:\d+\+?){3,3}\) - 8/);
    });
  });
  
  it('should post a youtube link to rick astleys hit single', function(){
    return room.user.say('user1', '@hubot roll rick').then(function(){
      expect(room.messages).to.deep.equal([
        ['user1', '@hubot roll rick'],
        ['hubot', '@user1 https://www.youtube.com/watch?v=dQw4w9WgXcQ']
      ]);
    })
  });
  
  it('should help you out with some syntax', function(){
    return room.user.say('user1', '@hubot roll syntax').then(function(){
      expect(room.messages[0]).to.deep.equal(['user1', '@hubot roll syntax']);
      expect(room.messages[1][0]).to.equal('hubot');
      expect(room.messages[1][1]).to.be.a('string')
        .and.to.satisfy(function(syntax){
          return syntax.indexOf('@user1 Supports standard dice notation') === 0; 
        });
    });
  });
});
