const initalState = {
  count : localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")).length: 0 ,
  todo : localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
}

const countReducer = (state = initalState, action) => {
  switch(action.type) {
    case "ADDTODO" : {
      localStorage.setItem("todos", JSON.stringify(action.todo))
      return {...state, todo : action.todo, count : action.count + 1};
    }
    case "CLEARTODO" : {
      localStorage.setItem("todos", JSON.stringify([]))
      return {...state , todo : [], count : 0}
    }  
    default : return state;
  }

  return state;
}

export default countReducer;
