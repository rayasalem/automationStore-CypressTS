import { BASE_URL } from "../helper/constants";
import LoginPage from "./login_page";

class HomePage {

    elements =
        {

            loginPageBtn: () => cy.contains('a', 'Login or register'),
        }

    goToLoginPage(): LoginPage {
        cy.visit(BASE_URL);
        this.elements.loginPageBtn().click();

        cy.get('h1.heading1 .maintext')
            .should('be.visible')
            .and('contain.text', 'Account Login');
        return new LoginPage();
    }

}

export default HomePage;