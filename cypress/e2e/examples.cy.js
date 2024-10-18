describe('Various examples', () => {
    beforeEach(() => {
        cy.visit('/examples')
    })
    it('multi-page testing', () => {
        cy.getDataTest('nav-why-cypress').click()
        cy.location("pathname").should("equal", "/")
        cy.getDataTest('nav-overview').click()
        cy.location("pathname").should("equal", "/overview")
        cy.getDataTest('nav-fundamentals').click()
        cy.location("pathname").should("equal", "/fundamentals")
    }),
    it.only('intercepts', () => {
        cy.intercept("POST", "http://localhost:3000/examples", {
            // body: {
            //     message: 'successfully intercepted request'
            // },
            fixture: "example.json",
            headers: {
                "X-Powered-By": "Justin"
            },
            timeout: 5000
        }).as("signup")
        cy.getDataTest('postButton').click()
        cy.wait(['@signup'])
    })
})