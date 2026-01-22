import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client' //importa as funçoes do framework

const prisma = new PrismaClient()             //Variável para o formulário

const app = express()
app.use(express.json())
app.use(cors())



app.post('/usuarios', async (req, res) => {                       //Organizando as informações, função assíncrona

   await prisma.user.create({                                     //Requisições assíncronas, utiliza-se o await
        data:{
           email: req.body.email,
           name: req.body.name,
           age: req.body.age  
        }
    })


    res.status(201).json(req.body)                               //Criou um novo usuário e mostra
})

app.get('/usuarios', async (req, res) => {

    let users = []

    if(req.query){                                               //utilizando Query Params      
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email:req.query.email,
                age: req.query.age

            }
        })

    }else {
        const users = await prisma.user.findMany()               //Retorna todos os usuários 
    }
              //Retorna todos os usuários 

    res.status(200).json(users)                                  //Requisição deu certo
})

 

app.put('/usuarios/:id', async (req, res) => {                   //Função para edição de usuários, criando uma variavel de id para identificar cada usuário
                                                                 //utilizando  Route Params id 
   await prisma.user.update({    
    where:{                                                      
        id: req.params.id                                        //local que será editado
    },                                          
        data:{
           email: req.body.email,
           name: req.body.name,
           age: req.body.age  
             }
        })
        res.status(200).json(req.body)
    })

app.delete('/usuarios/:id', async (req, res) => {                //função de deletar um usuário identificado pelo id
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json ({message: 'Usuário deletado com Sucesso!'})
 
})


app.listen(3000)        
