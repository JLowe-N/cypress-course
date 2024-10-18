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
    })
    it('intercepts', () => {
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
    it.only('grudges', () => {
        cy.contains(/Add Some Grudges/i)

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 0)
        })
        cy.getDataTest('clear-button').should('not.exist')

        cy.getDataTest('grudge-input').within(() => {
            cy.get('input').type('Not enough tests')
        })
        cy.getDataTest('add-grudge-button').click()

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 1)
        })

        cy.getDataTest('grudge-input').within(() => {
            cy.get('input').type('grudge 2')
        })
        cy.getDataTest('add-grudge-button').click()

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 2)
            cy.get('li').its(1).should('contains.text', 'grudge 2')
        })
        cy.getDataTest('grudge-list-title').should('contains.text', 'Grudges')

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').its(0).within(() => {
                cy.get('button').click()
            })
        })
        

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 1)
            cy.get('li').its(0).should('contains.text', 'grudge 2')
        })

        cy.getDataTest('clear-button').click()

        cy.getDataTest('grudge-list').within(() => {
            cy.get('li').should('have.length', 0)
        })

    })
})