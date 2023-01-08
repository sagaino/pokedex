import { useEffect, useState } from "react"
import PokemonItem from "../component/pokemonItem"
import { paylaod, PokemonData } from "../data-types"
import PokomenService from "./api/services/pokemon_service"

export default function Home() {
  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState<any>(0);
  const [counter, setCounter] = useState<any>(0)
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [state, setState] = useState({})
  const [filter, setFilter] = useState({
    limit: 20,
    offset: 0,
  })

  useEffect(() => {
    getData(filter);
    return () => {
      setState({})
    }
  },[filter.offset])

  const onScroll = () => {
    const scrollY = window.scrollY;
    setCurrentScrollY(scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, []);

  
  const getData = async (filter : paylaod) => {
    setCurrentPage(filter.offset)
    try {
      const result = await PokomenService.fetchPokemon(filter);
      if(!result) return;
      const dataResult = [...pokemon, ...result]
      setPokemon(dataResult as any);
      setCounter(currentPage + filter.limit)
      setCurrentPage(currentPage + filter.limit)
    } catch (err) {
      throw err
    }
  }

  const appendList = async () => {
    const target = document.getElementById("pokemonContainer");
    if (!target) return;
    const dimension = target.getBoundingClientRect();
    const browserHeight = window.innerHeight;
    const top = dimension.top;
    const height = dimension.height;

    if(counter === 0 && currentPage === 0) return;
    if (top + height > browserHeight) return;
    const result = currentPage + filter.limit;
    if (result - counter !== 20) return;
    if (result <= currentPage) return;
    setFilter({ ...filter, offset: result - 20})
  }

  useEffect(() => {
    appendList();
  }, [currentScrollY])

  return (
    <div>
      <div className="bg-slate-900 py-5">
        <div className="text-3xl text-center text-amber-400">PokeDex</div>
      </div>
      <div id="pokemonContainer" className="px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 my-5">
        {
          pokemon.map((item : PokemonData, idx: any) => (
            <PokemonItem
              key={idx}
              id={item.id}
              name={item.name}
              pokemon_v2_pokemonsprites={item.pokemon_v2_pokemonsprites}
            />
          ))
        }
      </div>
    </div>
  )
}
