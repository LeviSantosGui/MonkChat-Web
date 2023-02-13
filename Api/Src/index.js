import db from './db.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async (req, resp) => {
    const login = req.body.login;
    const senha = req.body.senha;
    const cryptoSenha = crypto.SHA256(senha).toString(crypto.enc.Base64);

    let u = await db.tb_usuario.findOne({
        where: {
            ds_login: login,
            ds_senha: cryptoSenha
        },
        raw: true
    });

    if (u == null)
        return resp.send({ erro: 'Credenciais Inválidas!' });
    
    delete u.ds_senha;
    resp.send(u);
});

app.post('/sala', async (req, resp) => {
    try {
        let salaParam = req.body;

        let s = await db.tb_sala.findOne({ where: { nm_sala: salaParam.nome } });
        if (s != null)
            return resp.send({ erro: 'Sala já Existe!' });

        let r = await db.tb_sala.create({
            nm_sala: salaParam.nome,
            bt_ativo: salaParam.ativo
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Um Erro Aconteceu!'})
    }
});

app.get('/sala', async (req, resp) => {
    try {
        let salas = await db.tb_sala.findAll();
        resp.send(salas);
    } catch (e) {
        resp.send({ erro: 'Um Erro Aconteceu!'})
    }
});

app.post('/usuario', async (req, resp) => {
    try {
        let usuaParam = req.body;

        let u = await db.tb_usuario.findOne({ where: { nm_usuario: usuaParam.nome } });
        if (u != null)
            return resp.send({ erro: 'Usuário já Existe!' });
        
        let r = await db.tb_usuario.create({
            nm_usuario: usuaParam.nome
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Um Erro Aconteceu!'})
    }
});

app.get('/usuario', async (req, resp) => {
    try {
        let usuarios = await db.tb_usuario.findAll();
        resp.send(usuarios);
    } catch (e) {
        resp.send({ erro: 'Um Erro Aconteceu!'})
    }
});

app.post('/chat', async (req, resp) => {
    try {
        let chat = req.body;

        let sala = await db.tb_sala.findOne({ where: { nm_sala: chat.sala.nome } });
        let usua = await db.tb_usuario.findOne({ where: { nm_usuario: chat.usuario.nome } })
    
        if (usua == null)
            return resp.send({ erro: 'Usuário não Existe!' });
        
        if (sala == null)
            return resp.send({ erro: 'Sala não Existe!' });
        
        if (!chat.mensagem || chat.mensagem.replace(/\n/g, '') == '')
            return resp.send({ erro: 'Mensagem é Obrigatória!' });
        
        
        let mensagem = {
            id_sala: sala.id_sala,
            id_usuario: usua.id_usuario,
            ds_mensagem: chat.mensagem,
            dt_mensagem: new Date()
        }

        let r = await db.tb_chat.create(mensagem);
        resp.send(r);
        
    } catch (e) {
        resp.send('Erro!');
        console.log(e.toString());
    }
});

app.get('/chat/:sala', async (req, resp) => {
    try {
        let sala = await db.tb_sala.findOne({ where: { nm_sala: req.params.sala } });
        if (sala == null)
            return resp.send({ erro: 'Sala não Existe!' });
        
        let mensagens = await
            db.tb_chat.findAll({
                where: {
                    id_sala: sala.id_sala
                },
                order: [['id_chat', 'desc']],
                include: ['tb_usuario', 'tb_sala'],
            });
    
        resp.send(mensagens);
    } catch (e) {
        resp.send(e.toString())
    }
});

app.listen(process.env.PORT,
    x => console.log(`> Server Up At Port ${process.env.PORT}`));