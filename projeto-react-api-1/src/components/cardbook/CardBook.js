import EditarLivro from '../../pages/EditarLivro';
import styles from './CardBook.module.css'
import {Link, link} from 'react-router-dom'

function CardBook ({id, livro, autor, category, handlerRemove}){

    const remove = (event)=>{
        event.preventDefault();
        handlerRemove(id);
    }
    return(

        <div className={styles.book_card}>
            <h4>{livro}</h4>
            <p> Autor: </p> {autor}
            
            <p className={styles.category_text}>
                <span/>Categoria: {category}
            </p>
            <p className={styles.book_card_actions}>
                <Link to={`/EditarLivro/${id}`}>Editar</Link>
                <button onClick={remove}>Excluir</button>
            </p>
        </div>

    )

}

export default CardBook;