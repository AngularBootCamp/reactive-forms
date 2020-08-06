export const app =
  'Step: ' +
  Cypress.config()
    .integrationFolder.split('\\')
    .find(pathSegment => /[0-9]/.test(pathSegment));

describe(app, () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should fill out and submit form', () => {
    cy.contains('.btn', 'Save').should('not.be.enabled');
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Smith');
    cy.get('#middleInitial').type('J');
    cy.get('#position').should('have.value', 'Sales');
    cy.get('#department').select('Payroll');
    cy.get('#immediateSupervisor').type('boss');
    cy.get('#phone')
      .type('invalid phone number')
      .should('have.class', 'ng-invalid');
    cy.get('#phone')
      .clear()
      .type('123-123-1234')
      .should('have.class', 'ng-valid');
    cy.get('#email')
      .type('invalid email')
      .should('have.class', 'ng-invalid');
    cy.get('#email')
      .clear()
      .type('email@email.com')
      .should('have.class', 'ng-valid');
    cy.get(':nth-child(9) > :nth-child(2) > label').click();
    cy.contains('.btn', 'Save').should('be.enabled').click();
    // this next check is pretty ugly
    cy.get('pre').should(
      'have.html',
      '{\n  "firstName": "John",\n  "lastName": "Smith",\n  "middleInitial": "J",\n  "position": "Sales",\n  "department": "Payroll",\n  "immediateSupervisor": "boss",\n  "phoneNumber": "123-123-1234",\n  "email": "email@email.com",\n  "status": "Inactive"\n}'
    );
    cy.get('.card-content > :nth-child(3)').should(
      'have.html',
      'true'
    );
  });
});
