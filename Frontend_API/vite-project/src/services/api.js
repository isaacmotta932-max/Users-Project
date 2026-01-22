//arquivo criado para conectar o frontend ao banco de dados do projeto
import axios from 'axios'        

const api= axios.create({
    baseURL:'http://localhost:3000'         //o endereço que está o backend  
})

export default api