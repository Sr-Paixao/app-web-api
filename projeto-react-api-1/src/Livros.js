import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '../components/Container'
import styles from './Livros.module.css'
import Message from '../components/message/Message';
import CardBook from '../components/cardbook/CardBook';
import { GiBookStorm } from 'react-icons/gi';


function Livros (){
    const [bookMessage, setBookMessage] = useState('')
    const [books, setBooks] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/books',{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            },
        })
        .then((resp)=>resp.json())
        .then((data)=>{setBooks(data); console.log(data)})
        .catch((error)=>{console.log(error)})
    }, []);

    // Function exclusao de livros
    function removeBooks(id){
        fetch(`http://localhost:5000/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json'
            },
        }, [])
        .then((resp)=>resp.json())
        .then((data)=>{
            setBooks(books.filter((book_data)=>book_data.id != id))
            setBookMessage('livro excluido com sucesso')
        })
        .catch((error)=>{console.log(error)})
    }




    const location = useLocation();
    let message =''
    console.log('location state: ' + location.state);

    if(location.state){
        message = location.state;
    };

    return(
        <section className={styles.livro_container}>
            <h1>VEJA SEUS <span>LIVROS</span> AQUI MEU MANO</h1>
            {
                message && <Message
                                msg={message}
                                type='sucess'
                            />
            }
            {
                bookMessage && <Message
                                msg={bookMessage}
                                type='sucess'
                            />
            }
            {/* <Container> */}

            {
                books.map((book)=>(
                <CardBook
                    id={book.id}
                    livro={book.nome_livro}
                    autor={book.autor}
                    category={book.categories.categories}
                    key={book.id}
                    handlerRemove={removeBooks}
                />

                ))
            }


            {/* </Container> */}
        </section>
    );

};

export default Livros;