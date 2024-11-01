import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`);
  
  if (!response.ok) {
    throw new Response("Pokémon not found", { status: 404 });
  }

  const data: Pokemon = await response.json();
  return json(data);
};

export default function PokemonDetail() {
  const pokemon = useLoaderData<Pokemon>();

  return (
    <div className="pokemon-detail-container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="my-4" />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <h2 className="mt-4">Abilities:</h2>
      <ul className="list-disc list-inside">
        {pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
      <h2 className="mt-4">Stats:</h2>
      <ul className="list-disc list-inside">
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
     
      <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
        Volver
      </a>
    </div>
  );
}