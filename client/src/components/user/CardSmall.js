// Packages
import React from "react"
import styled from "styled-components"
import { Avatar, Variables, Icon, Font } from "components-react-julseb"

// Styles
const Container = styled.label`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    .icon {
        display: none;
    }

    &.selected {
        .icon {
            display: inline;
        }

        .picture {
            opacity: 0.5;
        }
    }
`

const Input = styled.input`
    display: none;

    &:checked {
        & ~ .icon {
            display: inline;
        }

        & ~ .picture {
            opacity: 0.5;
        }
    }
`

const Name = styled(Font.P)`
    flex-grow: 1;
    margin: 0 ${Variables.Margins.XS};
`

function CardSmall(props) {
    return (
        <Container>
            <Input
                type="checkbox"
                id={`user-${props.user._id}`}
                name={props.name}
                value={props.user._id}
                onClick={props.onChange}
                {...props}
            />

            <Avatar
                src={props.user.imageUrl}
                alt={props.user.fullName}
                size={48}
                className="picture"
            />

            <Name>{props.user.fullName}</Name>

            <Icon
                name="check"
                color={Variables.Colors.Success500}
                size={24}
                className="icon"
            />
        </Container>
    )
}

export default CardSmall
