describe('Note app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3002/api/testing/reset');
        const user = {
            name: 'Nick Allen',
            username: 'nick',
            password: 'kcinick',
        };
        cy.request('POST', 'http://localhost:3002/api/users/', user);
        cy.visit('http://localhost:3000');
    });

    it('front page can be opened', function () {
        cy.contains('Notes');
        cy.contains(
            'Note app, Department of Computer Science, University of Helsinki 2021'
        );
    });

    it('user can login with good credentials', function () {
        cy.contains('log in').click();
        cy.get('#username').type('nick');
        cy.get('#password').type('kcinick');
        cy.get('#login-button').click();

        cy.contains('Nick Allen logged-in');
    });

    it('login fails with wrong password', function () {
        cy.contains('log in').click();
        cy.get('#username').type('nick');
        cy.get('#password').type('wrong');
        cy.get('#login-button').click();

        cy.get('.error')
            .should('contain', 'wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid');

        cy.get('html').should('not.contain', 'Nick Allen logged-in');
    });

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'nick', password: 'kcinick' });
        });

        it('a new note can be created', function () {
            cy.contains('new note').click();
            cy.get('input').type('a note created by cypress');
            cy.contains('save').click();
            cy.contains('a note created by cypress');
        });

        describe('and a note exists', function () {
            beforeEach(function () {
                cy.createNote({
                    content: 'another note cypress',
                    important: false,
                });
            });

            it('it can be made important', function () {
                cy.contains('another note cypress')
                    .contains('make important')
                    .click();

                cy.contains('another note cypress').contains(
                    'make not important'
                );
            });
        });
    });
});
