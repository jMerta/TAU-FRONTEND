import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Almost Jira');
  });

  it('should create navigation bar', () => {
    page.navigateTo();
    expect(page.getNavbarElement()).toBeTruthy();
  });

  it('should log in user', () => {
    browser.driver.get('http://localhost:4200/register');
    const user = browser.driver.findElement(by.name('username'));
    const password = browser.driver.findElement(by.name('password'));

    const button = element(by.className('submit'));

    user.sendKeys('first');
    password.sendKeys('nope');

    expect(user.getAttribute('value')).toEqual('first');
    expect(password.getAttribute('value')).toEqual('nope');

    button.click().then(() => {
      browser.waitForAngular();
      expect(browser.driver.get('http://localhost:4200/dashboard'));
    });
  };
});
