import Container from './components/Container';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Livros from './pages/Livros';
import NovoLivro from './pages/NovoLivro';
import EditarLivro from './pages/EditarLivro';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path='/' element={<NavBar/>}>

              <Route index element={<Home/>}/>
              <Route path='/Livro' element={<Livros/>}/>
              <Route path='/NovoLivro' element={<NovoLivro/>}/>
              <Route path='/EditarLivro/:id' element={<EditarLivro/>}/>
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>

    </div>
  );
}

export default App;
