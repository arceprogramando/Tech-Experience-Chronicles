'use client';

import { JSX, useEffect, useState } from 'react';

interface User {
  _id: string;
  username: string;
  email: string;
}

export default function Home(): JSX.Element {
  const [data, setData] = useState<User[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  console.log('API_URL', API_URL);
  useEffect((): void => {
    fetch(`${API_URL}/user/getAll`)
      .then((response): Promise<User[]> => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json(); // Esto es una promesa de User[]
      })
      .then((users: User[]): void => setData(users))
      .catch((): void => setError(true));
  }, [API_URL]);

  if (error) {
    return <div>❌ Error al obtener los usuarios {error}</div>;
  }

  if (!data) {
    return <div>⏳ Cargando...</div>;
  }

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {data.map(
          (user: User): JSX.Element => (
            <li key={user._id}>
              <p>User: {user.username} </p>

              <p>Email: {user.email ? user.email : 'No email provided'}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
