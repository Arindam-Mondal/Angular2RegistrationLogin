import { Angular2RegistrationLoginPage } from './app.po';

describe('angular2-registration-login App', function() {
  let page: Angular2RegistrationLoginPage;

  beforeEach(() => {
    page = new Angular2RegistrationLoginPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
