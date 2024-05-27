
import { useState, useEffect, useContext } from 'react';
import React from 'react';
import Card from '../components/Cardpokemon/Index';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components'
import { ThemeContext } from '../contexts/theme-context'

const Home = ({ setPokemonData }) => {
    const [pokemons, setPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [displayCount, setDisplayCount] = useState(10);

    const limit = 10;

    const navigate = useNavigate()

    useEffect(() => {
        fetchListData();

    }, []);

    const fetchListData = () => {
        const endpoints = [];
        for (let i = offset + 1; i <= offset + limit; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }

        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then((responses) => {
                const newPokemons = responses.map(r => r.data);


                setPokemons((prevPokemons) => {
                    const updatedPokemons = [...prevPokemons];
                    newPokemons.forEach(pokemon => {
                        if (!updatedPokemons.some(p => p.id === pokemon.id)) {
                            updatedPokemons.push(pokemon);
                        }
                    });
                    return updatedPokemons;
                });

                setAllPokemons((prevAllPokemons) => {
                    const updatedAllPokemons = [...prevAllPokemons];
                    newPokemons.forEach(pokemon => {
                        if (!updatedAllPokemons.some(p => p.id === pokemon.id)) {
                            updatedAllPokemons.push(pokemon);
                        }
                    });
                    return updatedAllPokemons;
                });

                setOffset((prevOffset) => prevOffset + limit);
                setDisplayCount((prevDisplayCount) => prevDisplayCount + limit);
            })
            .catch((error) => console.error('Erro ao carregar Pokémon:', error));
    };

    const reducePokemonDisplay = () => {
        setDisplayCount((prevDisplayCount) => Math.max(prevDisplayCount - limit, 10));
    };

    const pokemonFilter = (name) => {
        if (name === "") {
            setPokemons(allPokemons.slice(0, displayCount));
        } else {
            const filteredPokemon = allPokemons.filter((pokemon) =>
                pokemon.name.includes(name.toLowerCase())
            );

            if (filteredPokemon.length === 0) {

                axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
                    .then((response) => {
                        setPokemons([response.data]);
                    })
                    .catch((error) => console.error('Erro ao buscar Pokémon:', error));
            } else {
                setPokemons(filteredPokemon.slice(0, displayCount));
            }
        }
    };


    const pokemonPickHandler = (pokemonData) => {
        setPokemonData(pokemonData);
        navigate("/profile")

    }
    const { theme } = useContext(ThemeContext)
    return (
        <>

            <ThemeProvider theme={theme}>
                <Fundo>
                    <Navbar pokemonFilter={pokemonFilter} />
                    <Container>
                        {pokemons.slice(0, displayCount).map((pokemon, key) => (

                            <Ancora onClick={() => pokemonPickHandler(pokemon)} key={pokemon.id}>
                                <Card
                                    name={pokemon.name}
                                    image={pokemon.sprites.front_default}
                                    types={pokemon.types}
                                    key={key}
                                />
                            </Ancora>

                        ))}
                    </Container>
                    <Div>
                        <Button onClick={fetchListData}>Carregar mais Pokémon</Button>
                        <Button onClick={reducePokemonDisplay} disabled={displayCount <= 10}>Mostrar menos Pokémon</Button>
                    </Div>
                </Fundo>
            </ThemeProvider>
        </>
    );
};

export default Home


export const Fundo = styled.div`
background-color: ${(props) => props.theme.background};

`
export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 30px;
    
    
    
`
export const Div = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 15px;
    height: 300px;
    
`

export const Ancora = styled.div`
    cursor: pointer;
`

export const Button = styled.button`
    border-radius: 10px;
    font-weight: bold;
    height: 80px;
    width: 150px;
    background:#d14747;
    color:#fff;
    border:none;
    position:relative;
    font-size:1.1em;
    padding:0 2em;
    cursor:pointer;
    transition:800ms ease all;
    outline:none;
    &:hover{
        background:#ff0000;
        color:#faf8f8;
    }
    
`

