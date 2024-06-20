/*
Função:
1º Vamos entrar na documentação da API que queremos consumir
2º Criamos uma variável chamada "result", onde nela teremos o link da API.
3º No final da URL, adicionamos o parâmetro ${value} em template literals, onde vamos capturar o valor do input, que vai
ser passado para a função "fetchAPI" como um parâmetro, onde quando for chamada, completará o link, mostrando o conteúdo.
4º Vamos colocar um .then() ao final do link, que será a resposta do nosso fetch.
5º Dentro desse .then() colocaremos uma variável chamada "res", onde vamos fazer com que ela nos restorne um .json
6º Abaixo, criaremos mais um .then(), que dessa vez será uma variável "data" invés de "res". Ela nos mostrará o objeto que queremos.
7º Iremos colocar o return da função fetch, colocaremos um return no data para nos retornar os dados, e no result, para nos retornar o resultado do fetch

Eventos:
1º Vamos criar uma variável chamada "result" dentro do ouvinte de eventos do botão de busca, que receberá nossa função
fetchAPI(). E como parâmetro da nossa função, passaremos o valor do input com o ".value".
2º Abaixo da variável result, colocaremos nosso content para aparecer em tela, utilizando o textContent
3º Ele receberá um `${JSON.stringify(result, undefined, 2)}`
4º Como estamos fazendo um requisição assíncrona, devemos colocar o await no nosso "result" e o async no EventListener 
do botão, para nossa requisição funcionar.
*/
// Seleção dos elementos
const character_id = document.getElementById('characterId');
const button_go = document.getElementById('btn-go');
const content = document.getElementById('content');
const image = document.getElementById("img");
const button_reset = document.getElementById("btn-reset")
const container_result = document.getElementById("result-style")

const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode']
const new_keys = {
  name: "Nome",
  status: "Status",
  species: "Espécie",
  gender: "Gênero",
  origin: "Planeta de origem",
  episode: "Em quais episódios apareceu"
}

// Funções
const fetch_api = (value) => {
  const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((res) => res.json())
    .then((data) => {
      return data
    })
  return result
}

const build_result = (result) => {
  return keys.map((key) => document.getElementById(key)).map((elem) => {
    if (elem.checked === true && (Array.isArray(result[elem.name])) === true) {
      // Para todos os inputs tickados que são arrays ⬇️
      const array_result = result[elem.name].join('\r\n');
      const newElement = document.createElement('p');
      newElement.innerHTML = `${new_keys[elem.name]}: ${array_result}`
      content.appendChild(newElement)
    } else if (elem.checked === true && (elem.name === 'origin')) {
      // Para todos os inputs tickados que são do tipo Origin ⬇️
      const newElement = document.createElement('p');
      newElement.innerHTML = `${new_keys[elem.name]}: ${result[elem.name].name}`
      content.appendChild(newElement)
    } else if (elem.checked === true && typeof (result[elem.name]) !== 'object') {
      // Para todos os inputs tickados que não são arrays nem do tipo Origin ⬇️
      const newElement = document.createElement('p');
      newElement.innerHTML = `${new_keys[elem.name]}: ${result[elem.name]}`
      content.appendChild(newElement)
    }
  })
}

// Eventos
button_go.addEventListener('click', async (e) => {
  e.preventDefault();
  if (character_id.value === '') {
    image.src = '';
    return content.innerHTML = "É necessário preencher os campos acima!"
  }

  const result = await fetch_api(character_id.value);
  if (content.firstChild === null) {
    image.src = `${result.image}`
    build_result(result);
  } else {
    content.innerHTML = '';
    image.src = `${result.image}`;
    build_result(result);
  }
});

button_reset.addEventListener("click", () => location.reload())