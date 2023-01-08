import Link from "next/link";
import React, { useEffect, useState } from "react";
import DetailPokemonItem from "../../component/detailPokemonItem";
import { PokemonDetail } from "../../data-types";
import PokomenService from "../api/services/pokemon_service";

const DetailPokemon = ({data} : any) => {
  const [detailPokemon, setDetailPokemon] = useState(data)

  useEffect(() => {
    console.log(detailPokemon);
  },[detailPokemon])

  return (
    <div>
      <div className="bg-slate-900 py-5 flex items-center justify-between px-5">
        <Link href="/" className="w-1/3">
          <div className="text-[30px] cursor-pointer">Back</div>
        </Link>
        <div className="text-3xl text-center text-amber-400">Detail Pokemon</div>
        <div className="w-1/3"></div>
      </div>
      <div className="p-4 md:p-20 lg:p-20">
        {
          detailPokemon.map((item : PokemonDetail, idx: any) => (
            <DetailPokemonItem
              key={idx}
              id={item.id}
              name={item.name}
              pokemon_v2_pokemonsprites={item.pokemon_v2_pokemonsprites}
              pokemon_v2_pokemontypes={item.pokemon_v2_pokemontypes}
              pokemon_v2_pokemonabilities={item.pokemon_v2_pokemonabilities}
              pokemon_v2_pokemonstats={item.pokemon_v2_pokemonstats}
            />
          ))
        }
      </div>
    </div>
  );
};

export default DetailPokemon;

export async function getServerSideProps({params} : any) {
  
  const payload = {
    id: params.id
  }
  const respon = await PokomenService.fetchDetailPokemon(payload);

  return {
    props: {
      data: respon,
    }
  }
}
