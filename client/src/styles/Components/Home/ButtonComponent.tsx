import styled from "styled-components";

export const ButtonComponent = styled.button`
    & {
        background-color: rgb(4, 62, 255);
        border: none;
        border-radius: 4px;
        transition: 0.2s all ease-in;
        border: 1px solid rgb(4, 62, 255);
        width: 85px;
        height: 43px;
    }
    &:hover {
        background-color: transparent;
        border-color: rgb(4, 62, 255);
    }
    & > button {
        transition: 0.2s all ease-in;
        font-size: 1.2rem;
        color: #ffffff;
    }
    &:hover > button {
        color: rgb(4, 62, 255);
    }
`;
