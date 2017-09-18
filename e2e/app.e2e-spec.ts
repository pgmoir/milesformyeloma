import { MilesForMyelomaPage } from './app.po';

describe('miles-for-myeloma App', () => {
  let page: MilesForMyelomaPage;

  beforeEach(() => {
    page = new MilesForMyelomaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
