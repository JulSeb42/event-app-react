// Packages
import React, { useState } from "react"
import styled from "styled-components"

// Components
import Button from "../ui/Button"
import * as Variables from "../styles/Variables"
import Form from "../forms/Form"
import Input from "../forms/Input"

// Styles
const ButtonStyled = styled(Button)`
    display: ${props => props.visible};
`

const Container = styled.div`
    display: ${props => props.open};
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.M};
    padding: ${Variables.Margins.S};
`

function FiltersContainer(props) {
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "grid" : "none"
    const visible = !isOpen ? "flex" : "none"

    return (
        <>
            <ButtonStyled
                btnstyle="primary"
                justify="start"
                onClick={() => setIsOpen(true)}
                visible={visible}
            >
                Filter
            </ButtonStyled>

            <Container open={open}>
                <Form
                    btnReset={() => {
                        setIsOpen(false)
                        window.location.reload(false)
                    }}
                >
                    <Input
                        label="Event name"
                        id="title"
                        onChange={props.onChangeTitle}
                        value={props.valueTitle}
                    />

                    <Input
                        label="Location"
                        id="location"
                        onChange={props.onChangeLocation}
                        value={props.valueLocation}
                    />
                </Form>
            </Container>
        </>
    )
}

export default FiltersContainer
