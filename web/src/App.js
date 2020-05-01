import React, {useState, useEffect} from 'react';
import api from './services/api';

import './global.css'; 
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
//Componente: funcao que retorna conteudo html, bloco isolado de html css e js.
//Estado: passar um atributo para componente, informacoes que um componente pai passa para o compnente filho
//Propriedade: informacao que o componente vai manipular (conceito: imutabilidade),
//import Header from './Header'

function App() { //component
  const[devs, setDevs] = useState([]);

  
    
  useEffect(()=>{ //BUSCAR DEV NA API
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);

      
    }
    loadDevs();

  }, []);  
 
  async function handleAddDev(data){
    const response = await api.post('/devs', data)
    console.log(response.data);
    setDevs([...devs, response.data]) //criacao de um array 'devs' copiando os devs que ja tem e adicionar 'response.data'
  }

  return ( 
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
           {/* percorre array de devs - loadDevs*/}
          {devs.map( dev => ( /*retorno para cada um dos devs. Chaves '{' são usadas 
          para retorno de uma funcao  , entre '(' nao precisa do return como no 
          exe abaixo*/
              <DevItem key= {dev._id} dev={dev}/>
          ))} 
        </ul>
      </main>
    </div>
    
  );
}

export default App;
/*const [counter, setCounter] = useState(0); //[variavel ou valor, funcao auxiliar para alterar o valor]

  function incrementCounter(){
    setCounter(counter + 1);
  }*/

/*return ( 
  <>
    <h1>Contador: {counter}</h1>
    <button onClick={incrementCounter}>Incrementar</button>
  </>
  <> exemplo componente e estado //header tem atributito, exemplo title, //com mais de um componente para nao perde a estilizacao usando div usar fragment tag:'<> </>'
    <Header title="Dashboard"/> 
    <Header title="Dashboard 1"/>
    <Header title="Dashboard 2"/>
  </>
);*/