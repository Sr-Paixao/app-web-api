import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'

import styles from './NovoLivro.module.css'

export default function NovoLivro() {
  const navigate = useNavigate();



  const [categories, setCategories] = useState([])
  const [book, setBook] = useState({})


  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data)
        console.log(data)
      })

      .catch((error) => {
        console.log(error)
      })
  }, [])

  function handleChangeBook(event) {
    setBook({ ...book, [event.target.name]: event.target.value })
    console.log(book)
  }

  function handleChangeCategory(event) {
    setBook({
      ...book,
      categories: {
        id: event.target.value,
        categories: event.target.options[event.target.selectedIndex].text,
      },
    })
    console.log(book)
  }

    function createBook(book) {
      fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'aplication/json',
        },
        body: JSON.stringify(book),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          navigate('/livros', {state: 'lixo'})
        })
        .catch((error) => {
          console.log(error)
        })
    }

    function submit(event) {
      event.preventDefault()
      createBook(book)
      
    }
  return (
    <section className={styles.novolivros_container}>
      <h1>Cadastre livro</h1>

      <form onSubmit={submit}>
        <Input
          type="text"
          name="nome_livro"
          id="nome_livro"
          placeholder="Digite o titulo do livro"
          text="Digite o titulo do livro"
          handlerOnChange={handleChangeBook}
        />

        <Input
          type="text"
          name="nome_autor"
          id="nome_autor"
          placeholder="Digite o nome do autor"
          text="Digite o nome do autor"
          handlerOnChange={handleChangeBook}
        />

        <Input
          type="text"
          name="descricao_livro"
          id="descricao_livro"
          placeholder="Digite a descricao do livro"
          text="digite a descricao do livro"
          handlerOnChange={handleChangeBook}
        />

        <Select
          name="categoria-id"
          text="selecione a categoria do livro"
          options={categories}
          handlerOnChange={handleChangeCategory}
        />
        <p>
          <button type="submit">Enviar</button>
        </p>
      </form>
    </section>
  )
}
