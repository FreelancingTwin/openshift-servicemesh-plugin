/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
    namespace Cypress {
        interface Chainable {
            login(OC_CLUSTER_USER: string, OC_CLUSTER_PASS: string, OC_IDP: string): Chainable<void>
        }
    }
}

Cypress.Commands.add('login', (OC_CLUSTER_USER, OC_CLUSTER_PASS, OC_IDP) => {
    const user = OC_CLUSTER_USER || Cypress.env('OC_CLUSTER_USER')
    const password = OC_CLUSTER_PASS || Cypress.env('OC_CLUSTER_PASS')
    const idp = OC_IDP || Cypress.env('OC_IDP')

    cy.visit('/').then(() => {
        cy.log('OC_IDP: ', typeof (idp), JSON.stringify(idp))
        if (idp != undefined) {
            cy.get('.pf-c-button').contains(idp).click()
        }
        cy.get('#inputUsername').type(user)
        cy.get('#inputPassword').type(password)
        cy.get('button[type="submit"]').click();
    })
})
