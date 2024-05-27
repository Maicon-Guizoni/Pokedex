import { useContext } from "react"
import { FaMoon } from "react-icons/fa6";
import { FiSun } from "react-icons/fi";
import styled, { ThemeProvider } from "styled-components";
import { ThemeContext, themes } from "../../contexts/theme-context";


export const ThemeTogglerButton = (props) => {

    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <ThemeProvider theme={theme}>
            <ButtonToggle {...props}
                onClick={() => {
                    setTheme(theme === themes.light ? themes.dark : themes.light);
                }}>
                {theme === themes.light ? <FaMoon /> : <FiSun />}
            </ButtonToggle>
        </ThemeProvider>
    );
};

const ButtonToggle = styled.button`
    border: 1px solid #5605ee;
    border-radius: 100%;
    padding: 8px;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color};
    background-color: ${(props) => props.theme.background};
    cursor: pointer;
    font-size: 22px;
    transition: .3s ease-in-out;
`



