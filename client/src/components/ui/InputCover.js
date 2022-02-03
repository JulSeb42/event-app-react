// Packages
import React from "react"
import { InputContainer, Variables, Icon, Image } from "components-react-julseb"
import styled from "styled-components"

// Styles
const Container = styled.label`
    position: relative;
    ${'' /* --size: 80px; */}
    width: 100%;
    height: 15vw;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: ${Variables.Radiuses.M};
    overflow: hidden;
    cursor: pointer;

    &:hover .hover {
        opacity: 1;
    }
`

const Input = styled.input`
    display: none;
`

const Img = styled(Image)`
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    object-fit: cover;
`

const EmptyContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    background-color: ${Variables.Colors.Gray200};
    display: inline-flex;
    align-items: center;
    justify-content: center;
`

const HoverContainer = styled.span`
    position: absolute;
    z-index: 2;
    background-color: ${Variables.Overlays.Plain.White50};
    color: ${Variables.Colors.Primary500};
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: ${Variables.Transitions.Short};
    display: inline-flex;
    align-items: center;
    justify-content: center;
`

function Empty(props) {
    return (
        <EmptyContainer>
            <Icon name="calendar" size={64} />
        </EmptyContainer>
    )
}

function Hover(props) {
    return (
        <HoverContainer className="hover">
            {props.icon ? (
                <Icon name={props.icon} size={32} />
            ) : (
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.2173 22.664L9.33333 22.684V16.7773L22.1787 4.05465C23.1787 3.05599 24.9373 3.05065 25.9453 4.05865L28.06 6.17332C28.564 6.67732 28.8413 7.34665 28.8413 8.05865C28.8413 8.77065 28.564 9.43999 28.06 9.94399L15.2173 22.664ZM26.1787 8.05465L24.06 5.94399L21.9347 8.05065L24.0493 10.164L26.1787 8.05465ZM20.04 9.92532L12 17.8893V20.008L14.116 20.0013L22.1547 12.04L20.04 9.92532Z"
                        fill="currentColor"
                    />
                    <path
                        d="M25.3333 28H6.66667C5.196 28 4 26.804 4 25.3333V6.66665C4 5.19599 5.196 3.99999 6.66667 3.99999H18.4627L15.796 6.66665H6.66667V25.3333H10.6387C10.6602 25.334 10.6814 25.337 10.7025 25.34C10.7258 25.3433 10.7489 25.3467 10.772 25.3467C10.7893 25.3467 10.807 25.3433 10.8247 25.34C10.8423 25.3367 10.86 25.3333 10.8773 25.3333H25.3333V16.4427L28 13.776V25.3333C28 26.804 26.804 28 25.3333 28Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </HoverContainer>
    )
}

function InputCover(props) {
    return props.label || props.helper || props.validation ? (
        <InputContainer
            label={props.label}
            helper={props.helper}
            validation={props.validation}
            id={props.id}
        >
            <Container>
                <Input type="file" id={props.id} {...props} />

                {props.src === "" ? (
                    <Empty icon={props.iconempty} />
                ) : (
                    <Img src={props.src} alt={props.alt} fit="cover" />
                )}

                <Hover icon={props.iconhover} />
            </Container>
        </InputContainer>
    ) : (
        <Container>
            <Input type="file" id={props.id} {...props} />

            {props.src === "" ? (
                <Empty icon={props.iconempty} />
            ) : (
                <Img src={props.src} alt={props.alt} />
            )}

            <Hover icon={props.iconhover} />
        </Container>
    )
}

export default InputCover