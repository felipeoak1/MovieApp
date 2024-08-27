const API_KEY = '9e477a7e86b75afe820d71aff0edf369';
const BASE_URL = 'https://api.themoviedb.org/3';
let lastfind = []
let dados = JSON.parse(localStorage.getItem('dados')) || []
let userLogged = false

let currentPage = 1;
const totalPages = 1000; // Número máximo de páginas permitidas pela API

function openFile() {
    // Defina o caminho para o arquivo local que você deseja abrir
    const filePath = './Novo projeto.mp4'; // substitua com o caminho correto
    
    // Crie um link temporário
    const a = document.createElement('a');
    a.href = filePath;
    a.target = '_blank'; // abre em uma nova aba
    a.click();
}

async function getSeries(page = 1) {
    let listGeneros = document.getElementById("generos");
    let loader = document.getElementById("loader");
    let series;
    
    // Mostrar o loader
    loader.style.display = 'block';
    
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTQ3N2E3ZTg2Yjc1YWZlODIwZDcxYWZmMGVkZjM2OSIsIm5iZiI6MTcyNDc2MzA5OC44NDkxMzgsInN1YiI6IjY2Y2E0ZjRhMWIwNjQzOTJiYTQ4OWJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F6AF2l6DkQbfEznipcPnP8-UMuIpaTDN6g1sW25ywVc'
        }
    };

    try {
        const response = await fetch(url, options);
        series = await response.json();
    } catch (err) {
        console.error('error:' + err);
    }

    // Esconder o loader após o carregamento
    loader.style.display = 'none';
    
    listGeneros.innerHTML = ''; 

    let limitedMovies = series.results.slice(0, 18);
      
    for (let c of limitedMovies) {
        listGeneros.innerHTML += `
            <li class="generos__item" onmouseenter="showOverlay(this)" onmouseleave="hideOverlay(this)"
                data-title="${c.title || "Sem informação"}" 
                data-overview="${c.release_date}">
                <img src="https://image.tmdb.org/t/p/w300/${c.backdrop_path}" width="200px" alt="${c.title}">
            </li>
        `;
    }

    document.getElementById("pageNum").innerText = `${page}`;
}


function changePage(pg) {
    const newPage = currentPage + pg;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        getSeries(currentPage);
    }
}

function showOverlay(element) {
    let overlay = element.querySelector('.overlay');
    if (!overlay) {
        const title = element.getAttribute('data-title');
        const overview = element.getAttribute('data-overview');

        overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `
            <h2>${title}</h2>
            <p>${overview}</p>
        `;
        element.appendChild(overlay);
    }

    overlay.classList.add('visible');
}

function hideOverlay(element) {
    const overlay = element.querySelector('.overlay');
    if (overlay) {
        overlay.classList.remove('visible');
    }
}


async function getPopularMovies() {
    let listmovies = document.getElementById("listmovies")
    let movies;
    
    const url = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=3';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTQ3N2E3ZTg2Yjc1YWZlODIwZDcxYWZmMGVkZjM2OSIsIm5iZiI6MTcyNDY5ODI5NS4wMjQwNDgsInN1YiI6IjY2Y2E0ZjRhMWIwNjQzOTJiYTQ4OWJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mJiqwGZK9QHG3tW9zIsN29kO3BWiDDKHmIMlFydxwT4'
    }
    };

    await fetch(url, options)
    .then(res => res.json())
    .then(json => {
        movies = json
    })
    .catch(err => console.error('error:' + err));

    let limitedMovies = movies.results.slice(0, 12);

    for (c of limitedMovies) {
        listmovies.innerHTML += `
            <li style="position: relative;" onmouseenter="showOverlay(this)" onmouseleave="hideOverlay(this)"
                data-title="${c.title || "Sem informação"}" 
                data-overview="${c.release_date}">
                <img src="https://image.tmdb.org/t/p/w300/${c.backdrop_path}" width="250px">
            </li>
        `;
    }

}

function showOverlay(element) {
    let overlay = element.querySelector('.overlay');
    if (!overlay) {
        // Obtém as informações dos atributos data-*
        const title = element.getAttribute('data-title');
        const overview = element.getAttribute('data-overview');

        // Cria o overlay se não existir
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `
            <h2>${title}</h2>
            <p>${overview}</p>
        `;
        element.appendChild(overlay);
    }

    // Adiciona a classe 'visible' para mostrar o overlay
    overlay.classList.add('visible');
}

function hideOverlay(element) {
    const overlay = element.querySelector('.overlay');
    if (overlay) {
        // Remove a classe 'visible' para esconder o overlay
        overlay.classList.remove('visible');
    }
}




function exibirLoginForm() {
    const loginBox = document.getElementById('loginbox');
    loginBox.innerHTML = `
        <h2 class="h2login">Login</h2>
        <form class="formlogin" onsubmit="login(event)">
            <div class="form-group">
                <label for="email"></label>
                <input type="email" id="emaillogin" name="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <label for="password"></label>
                <input type="password" id="passwordlogin" name="password" placeholder="Senha" required>
            </div>
            <button type="submit" class="btn">Entrar</button>
        </form>
        <p class="registerp">Não tem uma conta? <button onclick="register()" class="registerbutton">Cadastre-se</button></p>
    `;
}

function login(event) {
    event.preventDefault()
    const loginBox = document.getElementById('loginbox');


    let emaillogin = document.getElementById("emaillogin")
    let passwordlogin = document.getElementById("passwordlogin")

    console.log(emaillogin.value, passwordlogin.value)
    console.log(dados)
    
    let userRegisted = dados.find(ele => ele.email == emaillogin.value && ele.password == passwordlogin.value)

    if (userRegisted) {
        window.location.href = './movies.html'
    } else {
        loginBox.innerHTML = `<h2 class="h2login">Login</h2>
        <p class="errorlogin" id="errorlogin">Tente Novamente</p>
        <form class="formlogin" onsubmit="login(event)">
            <div class="form-group">
                <label for="email"></label>
                <input type="email" id="emaillogin" name="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <label for="password"></label>
                <input type="password" id="passwordlogin" name="password" placeholder="Senha" required>
            </div>
            <button type="submit" class="btn">Entrar</button>
        </form>
        <p class="registerp">Não tem uma conta? <button onclick="register()" class="registerbutton">Cadastre-se</button></p>`
        
        
        setTimeout(()=> {
            const errorElement = document.getElementById("errorlogin")
            if (errorElement) {
                errorElement.style.display = 'none'
            }
        }, 3000)
    }


}

function register() {
    const loginBox = document.getElementById('loginbox');

    loginBox.innerHTML = `
        <h2 class="h2login">Cadastro</h2>
        <form class="formregister" onsubmit="registerSubmit(event)">
        
            <div class="form-group">
                <label for="email">Login</label>
                <input type="text" id="login" name="login" placeholder="Login" required>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" required>
            </div>

            <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" id="password" name="password" placeholder="Senha" required>
            </div>

            <button type="submit" class="btn">Entrar</button>
        </form>
    `;
}

function registerSubmit(event) {
    event.preventDefault()

    let inputEmail = document.getElementById("email")
    let inputpassword = document.getElementById("password")
    let login = document.getElementById("login")

    dados.push({login: login.value, email: inputEmail.value, password: inputpassword.value})

    localStorage.setItem('dados', JSON.stringify(dados))

    window.location.href = './index.html'

    console.log(dados)
}

async function buscarFilme() {
    const titulo = document.getElementById('searchInput').value;
    const resultadoDiv = document.getElementById('resultado');
    const moviesfound = document.getElementById("vistos")
    
    if (titulo === '') {
        resultadoDiv.innerHTML = '<p>Por favor, digite um título de filme.</p>';
        return;
    }
    
    try {
        const resposta = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(titulo)}`);
        const dados = await resposta.json();
        if (dados.results.length > 0) {
            const filme = dados.results[0];

            if (!lastfind.some(ele => ele.title === filme.title)) {
                lastfind.push({title: filme.title, image: filme.poster_path});
            }

            resultadoDiv.innerHTML = `
                <div class="movietitle">
                    <h3>${filme.title}</h3>
                </div>

                <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}" style="width:200px;">

                <p class="date"><strong>Data de Lançamento:</strong> ${filme.release_date}</p>

                <button class="btnMovie" onclick="openFile()">ASSISTIR</button>

                <p class="summary">${filme.overview}</p>
                

                ${lastfind.length > 0 ? '<hr>' : null}
                ${lastfind.length > 0 ? '<h1 class="lasttitles">Recentes</h1>' : null}
            `;

            
            moviesfound.innerHTML = '';
            
            for (const c of lastfind) {
                moviesfound.innerHTML += `
                    <div class="moviesfound">
                        <img src="https://image.tmdb.org/t/p/w500${c.image}" alt="${c.title}" style="width:100px;" />
                    </div>
                `;
            }


        } else {
            resultadoDiv.innerHTML = '<p>Filme não encontrado.</p>';
        }
    } catch (erro) {
        resultadoDiv.innerHTML = '<p>Erro ao buscar filme. Tente novamente mais tarde.</p>';
    }
}

async function carregarGeneros() {
    const generosDiv = document.getElementById('generos');
    
    try {
        const resposta = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const dados = await resposta.json();
        
        const generos = dados.genres;
        generosDiv.innerHTML = generos.map(genre => `<div class="generos__lista"> <p class="generos__item">${genre.name}</p> </div>`).join('');
    } catch (erro) {
        generosDiv.innerHTML = '<p>Erro ao carregar gêneros. Tente novamente mais tarde.</p>';
    }
}
