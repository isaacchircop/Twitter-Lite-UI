// spec.js
describe('angularjs homepage', function() {
  var username = element(by.model('username'));
  var content = element(by.model('content'));
  var postButton = element(by.id('postTweet'));
  var tweetsDisplay = element.all(by.repeater('tweet in tweets'));

  function post(u, c) {
    username.sendKeys(u);
    content.sendKeys(c);
    postButton.click();
  }

  beforeEach(function() {
    browser.get('http://localhost:9000');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Twitterlite');
  });

  it('should post a tweet', function() {
    var testUser = 'tester';
    var testTweet = 'This is a test!';

    post(testUser, testTweet);

    expect(tweetsDisplay.first().getText()).toContain(testUser);
    expect(tweetsDisplay.first().getText()).toContain(testTweet);
  });

  it('should not accept a tweet without a username', function() {
    var testUser = '';
    var testTweet = 'This is a test!';
    var initialCount = tweetsDisplay.count();

    post(testUser, testTweet);

    expect(tweetsDisplay.count()).toEqual(initialCount);
  });

  it('should not accept a tweet without content', function() {
    var testUser = 'tester';
    var testTweet = '';
    var initialCount = tweetsDisplay.count();

    post(testUser, testTweet);

    expect(tweetsDisplay.first().getText()).toNotContain('@:');
    expect(tweetsDisplay.count()).toEqual(initialCount);
  });
});