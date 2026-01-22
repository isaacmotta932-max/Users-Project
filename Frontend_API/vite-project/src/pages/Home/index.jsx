import { useEffect, useState, useRef } from 'react'                    //executa assim que a pagina abrir
import './style.css'
import Lixo from '../../assets/Lixo.jpg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])
  //estabelece a variável para os dados coletados
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {  //função para mostrar os usuários 
    const usersFromApi = await api.get('/usuarios') // Atualiza o estado com os dados reais (.data)

    setUsers(usersFromApi.data)
  }


  async function createUsers() { //função para criar um novo usuário
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }


  useEffect(() => {
    getUsers()
  }, [])





  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name='nome' type="text" ref={inputName} />
        <input placeholder="Idade" name='idade' type="number" ref={inputAge} />
        <input placeholder="E-mail" name='email' type="email" ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome:  <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() =>deleteUsers(user.id)} className="trash-button">
            <img src={Lixo} alt="Lixeira" />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home