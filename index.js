import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

let posts = [];
app.get("/",(req, res) => {
    res.render("index.ejs", {posts : posts});
});

app.get("/novo", (req,res) => {
    res.render("novo.ejs");
});

//Criar o Post
app.post('/novo', (req, res) =>{
    const titulo = req.body.titulo;
    const mensagem  = req.body.mensagem;

    posts.push({titulo,
                mensagem,
                data: new Date()});
    res.redirect('/');
});


// Página da postagem 
app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    const post = posts[id];

    if (post){
        res.render('post.ejs', {post : post, id: id });
    } else {
        res.status(404).send("Post não encontrado");
    }
});

// Página da Edição da Postagem
app.get('/edit/:id', (req, res) =>{
    const id = req.params.id;
    const post = posts[id];
    if (post) {
        res.render('edit', { post: post, id: id });
    } else {
        res.status(404).send('Post não encontrado');
    }
});

// Recebimento do que será editado
app.post('/edit/:id', (req, res) =>{
    const id = req.params.id;
    posts[id] = {
        titulo : req.body.titulo,
        mensagem : req.body.mensagem,
        dataEdicao: new Date()
    };
    res.redirect("/");
});

// Exclusão do Post
app.post('/exclusao/:id', (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1);
    res.redirect('/');
});


app.get("/contact",(req, res) => {
    res.render("contact.ejs");
});

app.get("/about",(req, res) => {
    res.render("about.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});