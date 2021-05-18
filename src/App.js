import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import './App.css'

function App(props) {
  const [input, setInput] = useState("")
  const [log, setLog] = useState("")
  useEffect(() => {
  })

  const onHandleClick = () => {
    const _todo = [...props.todo, input]
    props.addTodo(_todo)
    setInput("")
  }

  const onClearClick = () => {
    setInput("")
    props.clearTodo()
  }
  
  const onRemoveClick = (e) => {
    setLog(e.target.className)

    if (e.target.nodeName === "INPUT" ) {
      const _todo = props.todo.filter((value, index) => {
        return index != (e.target.dataset.index)
      })
      props.addTodo(_todo)
    }

    //alert(1)
  }

  const onHandleInputChange = (e) => {
    setInput(e.target.value)
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-form">
        <input type="input" value={input} onChange={(e) => onHandleInputChange(e)}/>
        <input type="button" value="add" onClick={onHandleClick}/>
      </div>
      <div>
        <input type="button" value="clear" onClick={(e) => onClearClick(e)}/>
      </div>
      <div className="todos" onClick={(e) => {onRemoveClick(e)}}>
        <ul>
          {props.todo.map((value, index) => (
            <li key={index} className="todo-item">
              <p> {value} </p>
              <input type="button" data-index={index} value="x" />
            </li>
        ))}
        </ul>
      </div>
      <div>
        {log}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count : state.count,
    todo : state.todo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo : (todo) => dispatch({ type : "ADDTODO" , todo : todo}),
    clearTodo : () => dispatch({ type : "CLEARTODO" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
