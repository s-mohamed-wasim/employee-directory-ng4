import { AppPage } from './app.po';

describe('employee-directory-ng4 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the brand name', () => {
    page.navigateTo();
    expect(page.getBrandText()).toEqual('Employee Directory');
  });
});
