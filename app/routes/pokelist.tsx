import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "@remix-run/react";

export const loader = async () => {
  const pokemonListResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await pokemonListResponse.json();
  return json(data);
};

export default function PokeList() {
  const list = useLoaderData<typeof loader>();

  return (
    <ul>
      {list.results.map((element: any) => (
        <li key={element.name}>
          <Link to={`/pokemon/${element.name}`}>{element.name}</Link>
        </li>
      ))}
    </ul>
  );
}

