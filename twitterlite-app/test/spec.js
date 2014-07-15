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
});