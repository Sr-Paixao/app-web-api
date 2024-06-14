import styles from './Home.module.css'

function Home (){

    return(
        <section className={styles.home_container}>
            <h1>Bem vindo ao App Web<span>EASY LIBRARY</span></h1>
            <p>Começe já a gerenciar seus livros!!</p>
        </section>
    );

};

export default Home;