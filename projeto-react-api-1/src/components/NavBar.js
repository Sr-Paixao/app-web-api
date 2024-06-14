import { Outlet, Link } from 'react-router-dom';
import Container from './Container';
import styles from './NavBar.module.css'


function NavBar(){

    return(
        <>
        <Container>
            <ul className={styles.list}>
                
                <li className={styles.item}>
                    <Link to='/'>HOME</Link>
                </li>
                <li className={styles.item}>
                    <Link to='/Livro'>LIVROS</Link>
                </li>
                <li className={styles.item}>
                    <Link to='/NovoLivro'>Cadastrar Livro</Link>
                </li>

            </ul>
        </Container>
            <Outlet/>
        </>
    );
};

export default NavBar;