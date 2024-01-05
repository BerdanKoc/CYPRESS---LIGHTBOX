
describe('Composant Ceaser', () => {
    it('Doit crypter le texte', () => {
        cy.visit('../../ceaser.html')

        cy.get('#clair').type('Hello, World!');
        cy.get('#decal').type(3)
        cy.get('#coder').click()
        cy.get('#code').should('have.value','KHOORZRUOG')
    })
})