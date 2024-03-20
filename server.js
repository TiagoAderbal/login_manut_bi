const express = require('express');
const app = express();
const path = require('path');
const Sequelize = require('sequelize');

const conexao = new Sequelize("cadastro_siga_manut", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
});

const Usuario = conexao.define('Usuario', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    tableName: "projeto",
    timestamps: false,
    primaryKey: false
});

app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para lidar com a solicitação de login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Consulta o banco de dados para encontrar um usuário com o username fornecido
        const usuario = await Usuario.findOne({ where: { username } });

        if (usuario) {
            // Verifica se a senha fornecida corresponde à senha do usuário no banco de dados
            if (usuario.password === password) {
                // Credenciais corretas, envia uma resposta de sucesso
                res.status(200).json({ message: 'Login bem-sucedido' });
            } else {
                // Senha incorreta, envia uma resposta de erro
                res.status(401).json({ message: 'Senha incorreta' });
            }
        } else {
            // Usuário não encontrado, envia uma resposta de erro
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        // Erro ao acessar o banco de dados, envia uma resposta de erro
        console.error('Erro ao autenticar:', error);
        res.status(500).json({ message: 'Erro ao autenticar' });
    }
});

// Rota para servir o arquivo HTML
app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

// Verificar conexão com o banco de dados
conexao.authenticate()
    .then(() => {
        console.log("Conexão com banco de dados realizada com sucesso")
    }).catch((error) => {
        console.log("Erro de conexão com banco de dados:", error)
    });