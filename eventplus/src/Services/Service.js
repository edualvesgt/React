/**
 *  Modulo para trabalhar com apis. Disponibiliza as rotas da api bem como o servico com a biblioteca axios
 */
import axios from "axios";


/**
 *  Rota para o recurso eventos
 */
export const eventsResource = '/Evento'

// Rota para login
export const LoginResource = '/login'

// Rota para login
export const MyEventsResource = '/PresencasEvento/ListarMinhas'

// Rota para Home
export const HomeResource = '/'


// Rota para Instituicao
export const IstituicaoResource = '/instituicao'
/**
 *  Rota para o recurso proximos eventos
 */
export const nextEventResource = '/Evento/ListarProximos'

/**
 *  Rota para o recurso tipos eventos
 */
export const eventsTypeResource = '/TiposEvento'

const apiPort = '5000';
const localApiUri = `http://localhost:${apiPort}/api`;
const externalApiUri = null;

const api = axios.create({
    baseURL:localApiUri
});

export default api;