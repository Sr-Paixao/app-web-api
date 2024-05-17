import { useEffect, useState } from 'react';
import styles from './EditarLivro.module.css'
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import { useParams } from 'react-router-dom'


function EditarLivro(params){
    const  [categories, setCategories] = useState([]);
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



    const {id} = useParams();
    console.log('id:'+ id);

    const [book, setBook] = useState({});

    //recuperando os dados do livros
    useEffect(()=>{
        fetch(`http://localhost:5000/books/${id}`,{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            },
        })
        .then((resp)=>resp.json())
        .then((data)=>{setBook(data); console.log(data)})
        .catch((error)=>{console.log(error)})
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


    return(
        <div className={styles.book_container}>
            <h1>Edição de livro</h1>

            <form>
                <Input 
                    handlerOnChange={handlerChangeBook}
                    type='text'
                    name='nome_livro'
                    id='nome_livro'
                    placeholder='Digite o titulo do livro'
                    text='Digite o titulo do livro'
                    value={book.nome_livro}
                />

                <Input 
                    handlerOnChange={handlerChangeBook}
                    type='text'
                    name='autor'
                    id='autor'
                    placeholder='Digite o nome do autor do livro'
                    text='Digite o nome do autor do livro'
                    value={book.autor}
                />
                <Input 
                    handlerOnChange={handlerChangeBook}
                    type='text'
                    name='descricao'
                    id='descricao'
                    placeholder='Faça um breve resumo do livro'
                    text='Escreva a descrição do livro'
                    value={book.descricao}
                />


                <Select
                    handlerOnChange={handlerChangeCategory}
                    name="categoria_id"
                    text="selecione a categoria do livro"
                    options={categories}
                />
            </form>
        </div>
    )
}

export default EditarLivro