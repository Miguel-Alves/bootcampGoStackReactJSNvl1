import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Desafio ReactJS ${Math.random()}`,
	    "url": "http://github.com/",
	    "techs": ["ReactJS"]
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepository(repositories.filter(
      repository => repository.id !== id
    ));

  }

  return (
    <div>
      <ul data-testid="repository-list">

      {repositories.map(repository => {
        return (
            <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )
      })}

        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
