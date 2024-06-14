import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditarLivro.module.css";
import Input from "../components/form/Input";
import Select from "../components/form/Select";
import { useParams } from "react-router-dom";

function EditarLivro(params) {
    const { id } = useParams();
    console.log("id:" + id);
  
    const [book, setBook] = useState({});
  
    const navigate = useNavigate();  
 
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //recuperando os dados do livros
  useEffect(() => {
    fetch(`http://localhost:5000/ListagemLivro/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'*',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setBook(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handlerChangeBook(e) {
    setBook({ ... book, [e.target.name]: e.target.value });
    //console.log(book)
  }

  function handlerChangeCategory(e) {
    setBook({
      ...book,
      categories: {
        id: e.target.value,
        categories: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  function editBook(book){
    fetch(`http://localhost:5000/AlterarLivro/`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Headers':'*',
        },
        body: JSON.stringify(book)  
  })
    .then((resp) => resp.json())
    .then((data) => {
        setBook(data.data);
        navigate('/livro', {state:'livro alterado com sucesso'})
    })
    .catch((error) => {
        console.log(console.log(error));
    });
}

function submit(event){
    event.preventDefault()
    editBook(book)
}

  return (
    <div className={styles.book_container}>
      <h1>Edição de livro</h1>

      <form onSubmit={submit}>
        <Input
          handlerOnChange={handlerChangeBook}
          type="text"
          name="nome_livro"
          id="nome_livro"
          placeholder="Digite o titulo do livro"
          text="Digite o titulo do livro"
          value={book.nome_livro}
        />

        <Input
          handlerOnChange={handlerChangeBook}
          type="text"
          name="autor_livro"
          id="autor_livro"
          placeholder="Digite o nome do autor do livro"
          text="Digite o nome do autor do livro"
          value={book.autor_livro}
        />
        <Input
          handlerOnChange={handlerChangeBook}
          type="text"
          name="descricao_livro"
          id="descricao_livro"
          placeholder="Faça um breve resumo do livro"
          text="Escreva a descrição do livro"
          value={book.descricao_livro}
        />

        <Select
          handlerOnChange={handlerChangeCategory}
          name="categoria_id"
          text="selecione a categoria do livro"
          options={categories}
        />

        <p>
          <input type="submit" value="editar livro" />
        </p>
      </form>
    </div>
  );
}

export default EditarLivro;
