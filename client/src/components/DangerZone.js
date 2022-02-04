// Packages
import React, { useState, useEffect } from "react"
import {
    Font,
    ButtonsContainer,
    Button,
    Alert,
    Modal,
} from "components-react-julseb"

function DangerZone(props) {
    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
        isOpen
            ? document.body.classList.add("stop-scrolling")
            : document.body.classList.remove("stop-scrolling")
    }, [isOpen])

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                color="danger"
                justify="start"
            >
                {props.textbtnopen}
            </Button>

            <Modal className={isOpen ? "open" : ""}>
                <Alert color="danger" {...props}>
                    <Font.P>{props.text}</Font.P>

                    <ButtonsContainer>
                        <Button onClick={props.onClickPrimary} color="danger">
                            {props.textbtndelete}
                        </Button>

                        <Button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            btnstyle="text"
                        >
                            {props.textbtncancel || "No, cancel"}
                        </Button>
                    </ButtonsContainer>
                </Alert>
            </Modal>
        </>
    )
}

export default DangerZone
