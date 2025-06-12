describe('Teste de Login', () => {
    it('Deve fazer login com credenciais corretas', () => {
        cy.visit('http://localhost:5173/Login');

        // Aguarda a renderização da página pelo título
        cy.contains('Seja bem vindo de volta!').should('be.visible');

        // Preenche o formulário usando os atributos data-cy
        cy.get('[data-cy="login-email"]').should('be.visible').type('jurandirr@hotmail.com');
        cy.get('[data-cy="password"]').should('be.visible').type('12345678');

        // Clica no botão de login
        cy.get('[data-cy="entrar"]').click();
        cy.url({ timeout: 10000 }).should('include', '/Mapa');


        // Verifica se houve redirecionamento para a página após login
        cy.visit('http://localhost:5173/Mapa'); // ou faça o login primeiro
        // Aguarde ou confirme que o login foi efetuado e a navegação ocorreu
        // Em seguida, verifique se o elemento com data-cy="mapa" está visível
        cy.get('[data-cy="mapa"]').should('be.visible');

    });

    it('Deve mostrar erro ao inserir credenciais inválidas', () => {
        cy.visit('http://localhost:5173/Login');

        cy.contains('Seja bem vindo de volta!').should('be.visible');

        // Preenche com credenciais inválidas
        cy.get('[data-cy="login-email"]').should('be.visible').type('email@invalido.com');
        cy.get('[data-cy="password"]').should('be.visible').type('senhaerrada');
        cy.get('[data-cy="entrar"]').click();

        // Verifica a exibição da mensagem de erro
        cy.contains('Credenciais inválidas').should('be.visible');
    });
});
