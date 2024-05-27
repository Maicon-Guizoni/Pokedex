import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import styled, { ThemeProvider } from 'styled-components'
import { ThemeContext } from "../../contexts/theme-context"
import { ThemeTogglerButton } from "../theme-toggler-button"

const Navbar = ({ pokemonFilter, hideSearch, noBackground }) => {
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    return (
        <ThemeProvider theme={theme}>
            <Nav $primary={!noBackground} >
                <ImagePoke src="/assets/pokeapi-logo.png" alt="Imagem-pokemon" onClick={() => navigate("/")} />
                {!hideSearch ? (
                    <>
                        <Input type="text" autoComplete="off" name="text" className="input" placeholder="Pesquisar..." onChange={(e) => pokemonFilter(e.target.value)} />
                        <ThemeTogglerButton />
                    </>
                ) : null}

            </Nav >
        </ThemeProvider>
    )
}



export const Nav = styled.nav`
    
    height: 100px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: ${props => props.primary ? "2px outset black" : "none"};
    border-top: ${props => props.primary ? "2px inset black" : "none"};
    
`

export const Input = styled.input`
    border: none;
    outline: none;
    border-radius: 15px;
    padding: 1em;
    background-color: #bfdb6f;
    box-shadow: inset 2px 5px 10px rgba(0,0,0,0.3);
    transition: 300ms ease-in-out;
    
    &:focus {
    background-color: rgb(243, 211, 211);
    transform: scale(1.05);
    box-shadow: 13px 13px 100px #969696,
    -13px -13px 100px #e4b1b1; 
}
`
export const ImagePoke = styled.img`
    max-width: 200px;
    height: 80%;
    cursor: pointer;
    
`



export default Navbar