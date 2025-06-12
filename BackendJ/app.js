const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

// --- IMPORTAÇÃO DAS ROTAS E CONTROLADORES ---
const { registerUser, userRouter } = require('./controller/UserController'); // Nova importação
const authRoutes = require('./controller/AuthController');
const alertRoutes = require('./controller/AlertController');
const occurrenceRoutes = require('./controller/OcurrenceController');
const markerRoutes = require('./controller/MarkerController');
const { authenticate } = require('./middleware/authenticate');

const app = express();

// --- CONFIGURAÇÕES DE MIDDLEWARE ---
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// --- CONEXÃO COM O BANCO DE DADOS ---
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/MeuBanco';
mongoose.connect(mongoURI)
    .then(() => console.log(`MongoDB conectado com sucesso em ${mongoURI}!`))
    .catch(err => console.error('ERRO AO CONECTAR AO MONGODB:', err.message));

// =================================================================================
// --- ROTAS DA APLICAÇÃO (ORDEM CORRETA) ---
// =================================================================================

// --- ROTAS PÚBLICAS ---

// Rota de verificação de saúde
app.get('/health', (req, res) => {
    const isMongoConnected = mongoose.connection.readyState === 1;
    if (isMongoConnected) {
        res.status(200).json({ status: 'OK', database: 'connected' });
    } else {
        res.status(503).json({ status: 'ERROR', database: 'disconnected' });
    }
});

// Rotas de Autenticação (Login)
app.use('/auth', authRoutes);

// **NOVA ROTA PÚBLICA PARA REGISTRO DE USUÁRIO**
app.post('/register', registerUser);


// --- ROTAS PROTEGIDAS ---
// Qualquer rota abaixo desta linha precisará de um token válido

// Monta as rotas de usuário protegidas (ex: /api/users/me)
app.use('/api/users', authenticate, userRouter);

// Monta outras rotas protegidas
app.use('/api/alerts', authenticate, alertRoutes);
app.use('/api/occurrences', authenticate, occurrenceRoutes); // Adicionado 'authenticate' se for protegida
app.use('/api/markers', authenticate, markerRoutes); // Adicionado 'authenticate' se for protegida

// --- INICIAR O SERVIDOR ---
const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});