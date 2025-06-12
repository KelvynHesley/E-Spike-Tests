const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../middleware/authenticate');
const UserService = require('../service/UserService');

// =================================================================================
// FUNÇÃO PÚBLICA DE CRIAÇÃO DE USUÁRIO (REGISTRO)
// =================================================================================
const registerUser = async (req, res) => {
    try {
        const user = await UserService.addUser(req.body);
        // Resposta simplificada no registro
        res.status(201).json({ 
            message: 'Usuário registrado com sucesso!', 
            userId: user._id 
        });
    } catch (error) {
        console.error('Erro ao registrar usuário no controlador:', error);

        if (error.message && error.message.includes('Já existe um usuário com esse email')) {
            return res.status(409).json({
                status: 'error',
                message: error.message
            });
        }

        res.status(500).json({ message: 'Ocorreu um erro ao registrar o usuário.', error: error.message });
    }
};


// =================================================================================
// ROTAS PROTEGIDAS QUE USARÃO O MIDDLEWARE 'AUTHENTICATE'
// =================================================================================

// Rota para obter o usuário atual (logado)
router.get('/me', authenticate, async (req, res) => {
    try {
        // req.user é populado pelo middleware 'authenticate'
        const user = await UserService.getUserById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Atualizar usuário por email (Exemplo de rota, pode necessitar de autenticação/autorização)
router.put('/email/:email', authenticate, async (req, res) => {
    const { email } = req.params;
    const userData = req.body;
    
    try {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        const updatedUser = await UserService.updateUserByEmail(email, userData);
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para deletar o usuário atual
router.delete('/me', authenticate, async (req, res) => {
    try {
        await UserService.deleteUserById(req.user.id);
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para obter todos os usuários (geralmente uma rota de admin)
router.get('/', authenticate, async (req, res) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Exportando a função de registro e o router de rotas protegidas
module.exports = {
    registerUser,
    userRouter: router // Renomeando para evitar confusão na importação
};