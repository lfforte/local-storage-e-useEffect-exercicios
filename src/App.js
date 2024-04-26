import { useEffect, useState } from 'react'
import { DivContainer, InputsContainer, ListaDeTarefas, Tarefa } from './style';


function App() {
  const [tarefas, setTarefas] = useState([]);
  const [valorDoInput, setValorDoInput] = useState(" ");
  const [filtro, setFiltro] = useState(" ")

  useEffect(() => { //recupera dados local
    const tarefasSalvas = localStorage.getItem('tarefas')
    if (tarefasSalvas) { //se existir tarefas salvas e recupera
      setTarefas(JSON.parse(tarefasSalvas))
    }
  }, [])//executa na primeira vez apenas 

  useEffect(() => { //salva dados no local
    if (tarefas.length > 0) { // precisa ter o if para não deixar zera o array
      localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }
  }, [tarefas])

  //controle do input
  const pegarValorDoInput = (event) => {
    setValorDoInput(event.target.value);
  }

  //criando a váriavel como objeto padrão ao chamar a função criar tarefa
  const criarTarefa = () => {
    const novaTarefa = {
      id: Date.now(),
      texto: valorDoInput,
      completa: false
    }
    //copia o estado tarefa e adiciona a nova tarefa no array .push()
    const copiandoEstado = [...tarefas];
    copiandoEstado.push(novaTarefa)
    //setTarefas com o estado novo
    setTarefas(copiandoEstado);
    setValorDoInput(' ') //limpa input
  }

  //monitora qual tarefa eu clicar inverte o 'tarefas.completas' e pelo styled ele deixa o  riscado
  const selecionarTarefa = (id) => {
    const mudaStatus = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return {
          ...tarefa,
          completa: !tarefa.completa
        }
      }
      return tarefa
    })
    setTarefas(mudaStatus)
  }

  //pega o 'valor' selecionado na opção da tela e pela função abaixo filter retorna as opções 
  const pegarValorDoSelect = (event) => {
    setFiltro(event.target.value)
  }


  const listaFiltrada = tarefas.filter(tarefa => {
    switch (filtro) {
      case 'pendentes':
        return !tarefa.completa
      case 'completas':
        return tarefa.completa
      default:
        return true
    }
  });


  return (
    <DivContainer>
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={valorDoInput} onChange={pegarValorDoInput} />
        <button onClick={criarTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={pegarValorDoSelect}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <ListaDeTarefas>
        {listaFiltrada.map(tarefa => {
          return (
            <Tarefa
              completa={tarefa.completa}
              onClick={() => selecionarTarefa(tarefa.id)}
            >
              {tarefa.id}
              {tarefa.texto}
              {tarefa.completa ? '  Completa' : '  Inconpleta'}
            </Tarefa>
          )
        })}
      </ListaDeTarefas>
    </DivContainer>
  )
}


export default App
