const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Diretório onde estão os arquivos HTML

let lobbies = [];

app.post('/lobbies', (req, res) => {
    const { name, creator, passwordRequired, password, maxUsers } = req.body;
    if (lobbies.find(lobby => lobby.name === name)) {
        return res.status(400).send('Lobby já existe.');
    }
    lobbies.push({
        name,
        creator,
        passwordRequired: passwordRequired || false,
        password: password || null,
        maxUsers: maxUsers || 10, // Valor padrão de 10 usuários
        users: [],
        userCount: 0
    });
    res.send('Lobby criado com sucesso.');
});

app.post('/join-lobby', (req, res) => {
    const { name, user, password } = req.body;
    const lobby = lobbies.find(lobby => lobby.name === name);
    if (!lobby || (lobby.passwordRequired && lobby.password !== password)) {
        return res.status(400).send('Lobby não encontrado ou senha incorreta.');
    }
    if (lobby.userCount >= lobby.maxUsers) {
        return res.status(400).send('Lobby está cheio.');
    }
    res.send('Entrou no lobby com sucesso.');
});

app.get('/lobbies', (req, res) => {
    res.json(lobbies);
});

io.on('connection', (socket) => {
    console.log('Um usuário se conectou:', socket.id);

    socket.on('join', (lobbyName, userName) => {
        const lobby = lobbies.find(lobby => lobby.name === lobbyName);
        if (!lobby || lobby.userCount >= lobby.maxUsers) return;

        socket.join(lobbyName);
        lobby.users.push(userName);
        lobby.userCount++;
        io.to(lobbyName).emit('update participants', lobby.users);
        io.to(lobbyName).emit('chat message', { user: 'Sistema', message: `${userName} entrou no lobby.` });
        console.log(`${userName} entrou no lobby ${lobbyName}`);
    });

    socket.on('chat message', (data) => {
        io.to(data.lobby).emit('chat message', { user: data.user, message: data.message });
    });

    socket.on('chat image', (data) => {
        io.to(data.lobby).emit('chat image', { user: data.user, image: data.image });
    });

    socket.on('roll dice', (data) => {
        const result = rollDice(data.diceType);
        io.to(data.lobby).emit('roll result', { diceType: data.diceType, result });
    });

    socket.on('leave', (lobbyName, userName) => {
        const lobbyIndex = lobbies.findIndex(lobby => lobby.name === lobbyName);
        if (lobbyIndex === -1) return;

        const lobby = lobbies[lobbyIndex];
        if (lobby.creator === userName) {
            // O criador está saindo, então exclua o lobby
            lobbies.splice(lobbyIndex, 1); // Remove o lobby da lista
            io.to(lobbyName).emit('chat message', { user: 'Sistema', message: 'O criador do lobby saiu. O lobby foi excluído.' });
            io.to(lobbyName).emit('update participants', []); // Atualiza a lista de participantes para vazia
        } else {
            // Apenas remova o usuário
            lobby.users = lobby.users.filter(user => user !== userName);
            lobby.userCount--;
            io.to(lobbyName).emit('update participants', lobby.users);
            io.to(lobbyName).emit('chat message', { user: 'Sistema', message: `${userName} saiu do lobby.` });
            console.log(`${userName} saiu do lobby ${lobbyName}`);
        }
    });

    socket.on('disconnect', () => {
        console.log('Um usuário se desconectou:', socket.id);
    });
});

function rollDice(diceType) {
    const sides = parseInt(diceType.slice(1));
    return Math.floor(Math.random() * sides) + 1;
}

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
 