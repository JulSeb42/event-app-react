// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

// Utils
import convertDate from "../utils/convertDate"

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 20vw;
    min-height: 300px;
    border-radius: ${Variables.Radiuses.XL};
    overflow: hidden;

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background: ${Variables.Colors.Overlay};
    }
`

const Img = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    object-fit: cover;
`

const Content = styled.div`
    position: relative;
    z-index: 3;
    color: ${Variables.Colors.White};
    padding: ${Variables.Margins.M};
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

function Cover(props) {
    return (
        <Container>
            {props.event.imageUrl && props.event.imageUrl !== "" && (
                <Img src={props.event.imageUrl} alt={props.event.title} />
            )}

            <Content>
                <Font.H1>{props.event.title}</Font.H1>

                <Font.P>
                    From {convertDate(props.event.startDate)} at{" "}
                    {props.event.startTime} to{" "}
                    {convertDate(props.event.endDate)} at {props.event.endTime}
                </Font.P>
            </Content>
        </Container>
    )
}

export default Cover
