import Input from '../components/form/Input';
import Select from '../components/form/Select';
import styles from './NovoLivro.module.css';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'  


function NovoLivro (){

    // state de categories que chama as categorias
    const  [categories, setCategories] = useState([]);

    // state que vai cadastrar os livros
    const [book, setBook] = useState({});

    //objeto de navegação
    const navigate = useNavigate();


    useEffect(()=>{
        fetch(
            'http://localhost:5000/categories',
            {
                method:'GET',
                headers:{
                    'Content-Type' : 'application/json'
                }
            }
        ).then(
            (res)=>
                res.json()
            
        ).then(
            (data) =>{
                setCategories(data);
                console.log(data);
            }
        )
        .catch(
            (error) =>{
                console.log(error);
            }
        )
    }, []);

    function handlerChangeBook(e){

        setBook({... book, [e.target.name] : e.target.value})
        //console.log(book) 
    };

    function handlerChangeCategory(e){

        setBook({... book, categories:{
            id : e.target.value,
            categories : e.target.options[e.target.selectedIndex].text
        }})
    };

    //console.log(book)
    
    function createBook(book){
        fetch('http://localhost:5000/inserirLivro',{
            method:'POST',
            mode: 'cors',
            headers:{
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'*'
            },

            body: JSON.stringify(book)
        })
        .then(
            (resp)=>resp.json())

        .then(
            (data) =>{console.log(data)
            navigate('/livro', {state:'Livro cadastrado com sucesso ^_^'})
            })
        .catch(
            (error) =>{console.log(error)
            
            })
    }
    
    function submit(e){
        e.preventDefault()
        createBook(book)
    }

    return(
        <section className={styles.novo_livro_container}>
            <h1><span>Cadastro</span> de livros</h1>
            <form onSubmit={submit}>
                <Input 
                    handlerOnChange={handlerChangeBook}
                    type='text'
                    name='nome_livro'
                    id='nome_livro'
                    placeholder='Digite o titulo do livro'
                    text='Digite o titulo do livro'
                />

                <Input 
                    handlerOnChange={handlerChangeBook}
                    type='text'
                    name='autor_livro'
                    id='autor_livro'
                    placeholder='Digite o nome do autor do livro'
                    text='Digite o nome do autor do livro'
                />

                <Input 
                    handlerOnChange={handlerChangeBook}
                    type='text'
                    name='descricao_livro'
                    id='descricao_livro'
                    placeholder='Faça um breve resumo do livro'
                    text='Escreva a descrição do livro'
                />

                <Select
                    handlerOnChange={handlerChangeCategory}
                    name="categoria_id"
                    text="selecione a categoria do livro"
                    options={categories}
                />

                <p>
                    <input type='submit' value='cadastrar livro'/>                
                </p>
                
            </form>
        </section>
    );

};

export default NovoLivro;