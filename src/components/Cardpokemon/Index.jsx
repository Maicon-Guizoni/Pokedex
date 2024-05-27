
import styled, { ThemeProvider } from 'styled-components'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme-context"

const Card = ({ name, image, }) => {

    const { theme } = useContext(ThemeContext)
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Cards className='container-card'  >
                    <Image src={image} alt={name} />
                    <Name>{name}</Name>
                </Cards>
            </Container>
        </ThemeProvider>
    )
}

export const Container = styled.div`

    color: ${(props) => props.theme.color};
    background-color: ${(props) => props.theme.background};
`

export const Cards = styled.div`
    border: 13px groove #fcf9f9;
    border-radius: 10px;
    width: 300px;
    height: 430px;
    background-image: url(../assets/desktop-wallpaper-pokedex-template-by-hatirem-pokemon-pokedex-background-thumbnail.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const Name = styled.h1`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    height: auto;
    font-size: 45px;
    margin-bottom: 20px;
    font-family: "Poetsen One", sans-serif;
    font-weight: 400;
    font-style: normal;
`
export const Image = styled.img`
    width: 260px;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
`


export default Card