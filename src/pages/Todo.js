import { useState, useEffect } from 'react'; 
import { Navigate } from 'react-router-dom'; 
import { useNavigate, NavLink } from 'react-router-dom'; 

export default function Todos(){
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState(false);
  const [todoId, setTodoId] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todoStats, setTodoStats] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);

    if (accessToken) {
      getTodos();
      getTodoStats();
    } else {
      navigate('/');
    }
  
  }, [navigate]);

  const handleSubmit = async (e) => {

    const response = await fetch('https://todo-api-is14.onrender.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        text  
      })
    });

    if(response.ok){
      console.log("todo created")
    } else {
      console.error("todo not created")
    }
  }

  const getTodos = async () => {
    try {

        const response = await fetch('https://todo-api-is14.onrender.com/todos', {
          headers: {
            Authorization: `Bearer ${token}`
          }  
        });

        if(response.ok) {

            const data = await response.json();
            console.log('Fetching todos...');
            console.log(data);

            if(Array.isArray(data)) {
              setTodos(data);
            } else {
              console.error('Data is not an array');
            }
    
          } else {
            console.error('API response was not ok');  
          }
    
        } catch (error) {
          console.error('Error fetching todos', error);
        }
  }

  const toggleDone = async (todo) => {

    let completed = {done: !todos.done}

    try{
      const response = await fetch(`https://todo-api-is14.onrender.com/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(completed),
      });
      
      console.log(response);

      if(response.ok) {
        getTodos();
      }

      const reply = await response.json();
      console.log(reply);
      
      }catch (error){
          console.error("There was an error"); 
      }
    
  };

  const getTodoStats = async () => {
    try {
      const response = await fetch('https://todo-api-is14.onrender.com/stats/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const statsData = await response.json();
        setTodoStats(statsData);
      } else {
        console.error('API response was not ok');
      }
    } catch (error) {
      console.error('Error fetching todo stats', error);
    }
  };

    const deleteTodo = async (todo) => {
      console.log("Deleting a todo");
      try{
        const response = await fetch(`https://todo-api-is14.onrender.com/todos/${todo.id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const reply = await response.json();
        console.log(reply); 
        window.location.reload();
      }catch (error){
        console.error("Error deleting todo");
      }
    };

    function logout() {
      localStorage.removeItem('accessToken');
      };
  
    function handleLogout() {
        logout();
        navigate('/');
      };



  return (

  <div className = "min-h-screen h-full bg-gray-200">
      <div className = "flex flex-1 p-5 bg-blue-400 items-center text-white drop-shadow-md">

          <p className = "flex flex-auto justify-start text-4xl">Todo App</p>    
          <button className = "flex flex-none text-l" onClick={handleLogout}>Log Out</button> 

      </div>
    
    <div className ="flex w-full flex-row">
      
      <div className="flex flex-col flex-auto">
        {/* add todo card */}
        <div className = "container my-10 m-auto w-2/3 bg-white rounded-lg drop-shadow-xl p-8 size-50">
          <h1 className = "m-4 text-3xl">Create Todo</h1>
            <form className = "py-2" onSubmit={handleSubmit}>
              <label> 
                <input 
                  value={text}
                  className = "focus:outline-none focus:bg-blue-100 transition-all duration-200 p-2 "
                  placeholder = "Enter todo"
                  onChange={(e) => setText(e.target.value)}
                />
              </label>
              <button className = " transition duration-150 ease-out hover:ease-in  text-white bg-teal-500 m-3 py-2 px-4 rounded-lg drop-shadow-md hover:scale-110" type="submit">Save</button>
            </form>
        </div>

        <div>
          {todos.map(todo => (
            <div className = "flex flex-col my-10 m-auto w-2/3 bg-white rounded-lg drop-shadow-xl p-8 size-50" key={todo.id}>
              
              <div className ="flex flex-1 flex-row items-center">
                <span className = "flex flex-auto m-4 py-3 text-xl ">{todo.text}</span>
                <div>
                  <input  
                    type="checkbox" 
                    className = "flex flex-none"
                    defaultChecked={todo.done}
                    onChange={() => toggleDone(todo)}  
                  />
                </div>
              </div>

              <div className = "flex flex-1 border-t-2">
                <button className = "text-xl text-orange-600 p-5" onClick = {() => deleteTodo(todo)}>DELETE</button>
              
              </div>
            </div>
          ))}
        </div>
      </div>   

      <div className = "m-10 p-5 text-white text-lg flex flex-col flex-none bg-blue-400 h-1/4">
          <div>Todo Stats</div> 
          <div>
            {todoStats && (
              <div>
                <h2>Todo Statistics</h2>
                <p>Number of Todos: {todoStats.num_todos}</p>
                <p>Number of Done Todos: {todoStats.num_done}</p>
              </div>
            )}
          </div>
        </div>
    </div>
  </div>
    
  )
}