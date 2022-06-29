//Lib
import React, { useState, useEffect, useRef } from 'react';
import classes from './App.module.css';
import axios from '../../Axios-instance/axios-todo-list'

//Composants
import Task from '../../Components/Task/Task';
import Spinner from '../../UI/Spinner/Spinner';

function App() {

  //// Etats (cycle de vie)
  /// componentDidMount
   useEffect(() => {
     //console.log('[App.js] componentDidMount');
     //Focus dans l'input d'ajout des taches
     inputElement.current.focus();
     fetchTasksList();
   }, []);

  //// componentDidUpdate
  useEffect(() => {
      //console.log('[App.js] componentDidUpdate');
      //Focus dans l'input d'ajout des taches
      inputElement.current.focus();
  });

  //// componentWillUnmount
  // useEffect(() => {
  //     return() => {
  //         console.log('[App.js] componentWillUnmount');
  //     }
  // }, []);

  //// State
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  //// Ref
  const inputElement = useRef();

  //// Methodes
  // Suppression d'une tache
  const deleteTaskHandler = index => {
    axios.delete('/list/' + tasks[index].id + '.json')
      .then(() => {
        const newListOfTasks = [...tasks];
        newListOfTasks.splice(index, 1);
        setTasks(newListOfTasks);
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Coche/Decoche d'une tache
  const checkTaskHandler = index => {
    const newListOfTasks = [...tasks];
    newListOfTasks[index].check = !newListOfTasks[index].check
    axios.put('/list/' + tasks[index].id + '.json', newListOfTasks[index])
    .then(() => {
      setTasks(newListOfTasks);  
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  // Ajout d'une tache
  const addTaskHandler = event => {
    event.preventDefault(); //Evite le reload de la page par le nav suite à envoi du formulaire
    if (event.target[0].value === ""){
      inputElement.current.className = "shakeHorizontal"; //Shake input si vide.
      console.log("champ nul")
      inputElement.current.focus();
    }
    else {
      const newTask = {
        taskName: event.target[0].value,
        check: false
      };
      axios.post('/list.json', newTask)
        .then(() => {
          fetchTasksList();
          event.target.reset(); //Clear du form si le Post a reussi
          inputElement.current.className = ""; //Retrait du shake sur input
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  // Récupération de la liste des taches sur Firebase + ajout des ID firebase dans le state local
  const fetchTasksList = () => {
    setLoading(true);
    axios.get('/list.json')
      .then(reponseAxios => {
        const listOfTasks = [];
        for (let element in reponseAxios.data) {
          listOfTasks.push({
            ...reponseAxios.data[element],
            id: element
          });
        }
        setLoading(false);
        setTasks(listOfTasks); //ajout des ID dans le state local. Necessaire pour la suppression d'une tache
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  }

  // Création d'une liste dynamique de composants Task
  const tasksList = tasks.map((task, index) => {
    return (
      <Task
      key={index}
      check={task.check}
      taskName={task.taskName}
      deleteTask={() => deleteTaskHandler(index)}
      checkTask={() => checkTaskHandler(index)}
      >
      </Task>
    )
  })

  return (
    <>
      <div className={classes.App}>
        <header>
          <span>TO-DO LIST</span>
        </header>

        <div className={classes.add}>
          <form onSubmit={addTaskHandler}>
            <input 
              ref={inputElement} 
              //className={classes.shakeHorizontal} 
              type="text" 
              placeholder="Ajoutez une tâche ici !" 
            />
            <button type="submit">
              Ajouter
            </button>
          </form>
        </div>
        
        { loading ? 
        <Spinner />
        : <>
          {tasksList}
        </>
        }
      </div>

      <div className={classes.footer}>
        <p>Made with <span className={classes.heartPulse}>❤️</span> by <a href='https://r4ven.fr'>Raven</a></p>
      </div>
    </>
  );
}

export default App;
