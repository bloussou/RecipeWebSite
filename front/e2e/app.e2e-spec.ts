import { AppPage } from './app.po';

describe('public App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the web site title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('LES RECETTES DE KER PEDOR');
  });
});
