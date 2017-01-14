import { TomatitoPage } from './app.po';

describe('tomatito App', function() {
  let page: TomatitoPage;

  beforeEach(() => {
    page = new TomatitoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
