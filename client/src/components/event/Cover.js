// Packages
import React from "react"
import styled from "styled-components"
import {
    Variables,
    Image,
    Font,
    convertDateShort,
} from "components-react-julseb"

// Styles
const Container = styled.div`
    width: 100%;
    position: relative;
    border-radius: ${Variables.Radiuses.M};
    overflow: hidden;
    height: 20vw;
    min-height: 150px;

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${Variables.Overlays.Gradient.Black};
        z-index: 2;
    }
`

const Img = styled(Image)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
`

const Content = styled.div`
    position: relative;
    z-index: 3;
    color: ${Variables.Colors.White};
    display: grid;
    gap: ${Variables.Margins.XS};
    align-content: end;
    width: 100%;
    height: 100%;
    padding: ${Variables.Margins.S};
`

function Cover({ event }) {
    return (
        <Container>
            {event.imageUrl ? (
                <Img src={event.imageUrl} alt={event.title} fit="cover" />
            ) : (
                <Img as="span" empty />
            )}

            <Content>
                <Font.H1>{event.title}</Font.H1>

                <Font.P>
                    <Font.Strong>
                        From {convertDateShort(event.startDate)} at{" "}
                        {event.startTime} to {convertDateShort(event.endDate)}{" "}
                        at {event.endTime}
                    </Font.Strong>
                </Font.P>
            </Content>
        </Container>
    )
}

export default Cover
