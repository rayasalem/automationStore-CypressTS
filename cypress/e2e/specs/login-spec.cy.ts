import HomePage from "cypress/support/pages/home_page";

describe('Login test suite', () => {

  it('Login with wrong user and password, error msg is shown', () => {
    const home_page: HomePage = new HomePage()
    const login_page = home_page.goToLoginPage()
    login_page.login_with_wrong_user_or_password("malik", "any_pwd");
  })
  
})