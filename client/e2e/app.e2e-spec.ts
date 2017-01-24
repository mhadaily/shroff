import { ShroffPage } from './app.po';

describe('shroff App', function() {
  let page: ShroffPage;

  beforeEach(() => {
    page = new ShroffPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
