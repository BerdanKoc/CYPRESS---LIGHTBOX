describe('Composant Lightbox', () => {
    it('Doit Ouvrir la lightbox quand on clique sur l\' image', () => {
        cy.visit('../../lightbox.html')

        cy.get('.relative').click(); // on ouvre la lighox
        cy.get('#lightbox').should('be.visible'); // on verifie si il est visible
    })

    it('Doit fermer la lightbox quand on clique en dehors de la lightbox', () => {
        cy.visit('../../lightbox.html')

        cy.get('.relative').click(); // on ouvre la lightbox
        cy.get('body').click(0, 0); // on clique en dehors de l'image
        cy.get('#lightbox').should('not.be.visible'); // on vérifie la fermuture
    })

    it('Teste l’ajout de la mention "j’aime" et ses compteurs, overlay et lightbox', () => {
        cy.visit('../../lightbox.html')

        cy.get('.relative').click(); // on ouvre la lightbox
        cy.get('[title="Like"]').click() // on clique sur le bouton j'aime
        cy.get('[x-text="likesCount"').contains(1) // on verifie si likesCount contient 1

        // Tester la supression de la mention "j’aime" et ses compteurs, overlay et lightbox

        cy.get('[title="Dislike"]').click() // on reclique sur le bouton j'aime pour enlever la mention j'aime
        cy.get('[x-text="likesCount"').contains(0)
    })

    it('Tester l’ajout d’un commentaire', () => {
        cy.visit('../../lightbox.html')

        cy.get('.relative').click(); // on ouvre la lightbox
        cy.get('[name="comment"]').click().type("Awesome!") // on clique sur la partie commentaires et on tape Awesome!
        cy.get('[type="submit"]').click() // on clique sur le bouton publier 

    })

    it('Tester que l’ajout d’un commentaire vide est impossible car le bouton "Publish" est désactivé.', () => {
        cy.visit('../../lightbox.html')

        cy.get('.relative').click(); // on ouvre la lightbox
        cy.get('[name="comment"]').click() // on clique sur la partie commentaires et on ecrit rien
        cy.get('[type="submit"]').should('be.disabled') // on verifie si le bouton publier est déactiver

    })

    it(' Tester l’option qui cache les commentaires', () => {
        cy.visit('../../lightbox.html')

        cy.get('.relative').click(); // on ouvre la lightbox
        cy.get('[name="comment"]').click().type("Awesome!") // on clique sur la partie commentaires et on tape Awesome!
        cy.get('[type="submit"]').click() // on clique sur le bouton publier 
        cy.get('[x-show="comments.length"]').click() // on clique sur "hide 1 comment"
        cy.get('[x-show="isCommentsVisible"]').should('not.be.visible') // on verifie si le commentaire est caché
    })

    it(' Tester les différents compteurs de commentaires, overlay et lightbox.', () => {
        cy.visit('../../lightbox.html')

        cy.get('.relative').click(); // on ouvre la lightbox
        cy.get('[name="comment"]').click().type("Awesome!") // on clique sur la partie commentaires et on tape Awesome!
        cy.get('[type="submit"]').click() // on clique sur le bouton publier 
        cy.get('[x-text="commentsCount()"]').contains("1") //overlay
        cy.get('[x-text="displayCommentText()"]').contains("Hide 1 comment")// lightbox 
    })

    it(' Tester le singulier/pluriel en fonction du nombre de commentaire.s', () => {
        cy.visit('../../lightbox.html')

        cy.get('.relative').click(); // on ouvre la lightbox
        cy.get('[name="comment"]').click().type("Awesome!") // on clique sur la partie commentaires et on tape Awesome!
        cy.get('[type="submit"]').click() // on clique sur le bouton publier

        cy.get('[x-text="displayCommentText()"]').should('contain', 'Hide 1 comment');
        
        cy.get('[name="comment"]').click().type("Awesomeeeeeeee!")
        cy.get('[type="submit"]').click()
        
        cy.get('[x-text="displayCommentText()"]').should('contain', 'Hide 2 comments');
    })

    it(' ajouter trois commentaires et tester la suppression du second commentaireau clique sur la croix associée', () => {
        cy.visit('../../lightbox.html')

        cy.get('.relative').click(); // on ouvre la lightbox
        cy.get('[name="comment"]').click().type("Awesome 1!")
        cy.get('[type="submit"]').click() // on clique sur la partie commentaires et on tape Awesome!
        cy.get('[name="comment"]').click().type("Awesomeeeeeeee 2!")
        cy.get('[type="submit"]').click()
        cy.get('[name="comment"]').click().type("Awesomeeeeeeeeeeee 3!")
        cy.get('[type="submit"]').click()

        cy.get('[x-text="displayCommentText()"]').should('contain', 'Hide 3 comments'); // on verife que les 3 commentaires sont presents

        cy.get('[title="Supprimer le commentaire"]').eq(1).click();

        cy.get('[x-text="displayCommentText()"]').should('contain', 'Hide 2 comments')

})
})