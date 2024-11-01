import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react"; 
import { useEffect, useState } from "react";

// Define un tipo para los Pokémon
interface Pokemon {
  name: string;
  url: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Pokémon List" },
    { name: "description", content: "List of Pokémon" },
  ];
};

export default function Index() {
  // Especifica que el estado es un arreglo de Pokémon
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    // Llamada a la API para obtener Pokémon
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = await response.json();
      setPokemons(data.results);
    };

    fetchPokemons();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to Pokémon App
          </h1>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            List of Pokémon:
          </p>
          <ul>
            {pokemons.map((pokemon) => (
              <li key={pokemon.name}>
                <Link
                  className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                  to={`/pokemon/${pokemon.name}`}
                >
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}