import { useLocation } from 'react-router-dom'

import styles from './Livro.module.css'

import Message from '../../components/Message/Message'

export default function Livros() {
  const location = useLocation();
  let message='';
  console.log(location.state);
  if(location.state){
    message = location.state
  }

  return (
    <section className={styles.livros_container}>
      <div>
        <h3>Livros</h3>
        {
          message && <Message msg={message} type="success"/>
        }
      </div>
    </section>
  )
}
