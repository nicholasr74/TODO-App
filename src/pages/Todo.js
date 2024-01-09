import { useState, useEffect } from 'react'; 
import { Navigate } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; 

export default function Todos(){
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState(false);
  const [todoId, setTodoId] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);

    if (accessToken) {
      getTodos();
    } else {
      navigate('/');
    }
  
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    function logout() {
    localStorage.removeItem('accessToken');
    }

    function handleLogout() {
        logout();
        navigate('/');
      }

  return (
    <div>
    
    <button onClick={handleLogout}>Sign Out</button> 
      <form onSubmit={handleSubmit}>
        <input 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      <button onClick={() => setShowTodos(!showTodos)}>
        {showTodos ? 'Hide All To Dos' : 'Show All To Dos'}
      </button>

      {showTodos && (
        <div>
          {todos.length > 0 && todos.map(todo => (
            <p key={todo.id}>{todo.text}</p>  
          ))}
        </div>
      )}



    </div>

    
  )
}