import {useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import './App.css'

function App(props) {
  const [input, setInput] = useState("")
  const inputRef = useRef(null)
  useEffect(() => {
  })

  const onInputKeyPress = (e) => {
    if (e.key === "Enter") {
        onAddClick(e);
    }
  }
  const onAddClick = (e) => {
    if (input === "") {
      alert("need to write todo");
      return;
    }
    const _todo = [...props.todo, input]
    props.addTodo(_todo)
    setInput("")

    inputRef.current.focus()
  }

  const onClearClick = () => {
    setInput("")
    props.clearTodo()
  }
  
  const onRemoveClick = (e) => {
    if (e.target.nodeName === "INPUT" ) {
      const _todo = props.todo.filter((value, index) => {
        return index !== (Number(e.target.dataset.index))
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
        <input ref={inputRef} type="input" onKeyPress={(e) => onInputKeyPress(e) } value={input} onChange={(e) => onHandleInputChange(e)}/>
        <input type="button" value="add"  onClick={(e) => onAddClick(e)}/>
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
