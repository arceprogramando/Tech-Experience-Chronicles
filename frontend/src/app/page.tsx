'use client';

import { JSX, useEffect, useState } from 'react';

// Definir la interfaz para los datos
interface ApiResponse {
  name: string;
}

export default function Home(): JSX.Element {
  const [data, setData] = useState<ApiResponse | null>(null); // Especificamos que data será de tipo ApiResponse o null
  const [error, setError] = useState<boolean>(false);

  useEffect((): void => {
    fetch('http://localhost:3000')
      .then((response): Promise<ApiResponse> => {
        // Indicamos que la respuesta será un objeto de tipo ApiResponse
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then((data: ApiResponse): void => setData(data))
      .catch((): void => setError(true));
  }, []);

  if (error) {
    return <div>Failed to fetch</div>;
  }

  return (
    <>
      <h3>{data ? data.name : 'Loading...'}</h3>
    </>
  );
}
