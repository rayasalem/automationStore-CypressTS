import { BASE_URL } from "../helper/constants";

class LoginPage {

    elements =
        {
            login_name: () => cy.get('#loginFrm_loginname'),
            password: () => cy.get('#loginFrm_password'),
            loginBtn: () => cy.contains('button', 'Login'),
            errorLoginMsg: () => cy.contains('div', 'Error: Incorrect login or password provided.'),
        }

    _login(login_name: string, password: string) {
        this.elements.login_name().type(login_name);
        this.elements.password().type(password);
        this.elements.loginBtn().click();
    }

    login_with_wrong_user_or_password(login_name: string, password: string) {
        this._login(login_name, password);
        this.elements.errorLoginMsg().should('be.visible');
    }


}

export default LoginPage;