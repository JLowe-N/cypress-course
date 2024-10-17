describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/fundamentals')
  })
  // it('expands', () => {
  //   cy.visit('/')
  //   cy.get(':nth-child(1) > #panel1a-header').click()
  //   cy.get('.Mui-expanded').should("contain.text", "An all-in-one testing framework")
    
  // })
  it('has a title', () => {
    cy.getDataTest('fundamentals-header').should('contain.text', 'Testing Fundamentals')
  }),
  it('Accordion works correctly', () => {
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible')
    cy.get('[data-test="accordian-item-1"] div[role="button"]').click()
    cy.contains(/Your tests will exist in a describe block/i).should('be.visible')
    cy.get('[data-test="accordian-item-1"] div[role="button"]').click()
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible')
  })
})