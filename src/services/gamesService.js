// Serviço que SIMULA requisições a um servidor.
// Conforme o requisito do MVP, em vez de chamar uma API real,
// fazemos a leitura de um JSON local com um pequeno atraso (delay)
// para reproduzir o comportamento assíncrono de uma requisição de rede.

import games from '../data/games.json'

// Simula o tempo de resposta de um servidor
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Retorna a lista completa de jogos (como se fosse um GET /games).
// Os dados carregados aqui alimentam o GamesContext, que cuida do CRUD.
export async function fetchGames() {
  await delay(700)
  return games
}
