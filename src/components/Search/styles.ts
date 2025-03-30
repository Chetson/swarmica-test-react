import styled from "styled-components";

export const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 400px;
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 10px 35px 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border 0.2s;

    &:focus {
        outline: none;
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
    }
`;

export const Spinner = styled.div`
    position: absolute;
    right: 10px;
    width: 16px;
    height: 16px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #1890ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const Dropdown = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 5px;
    padding: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
    max-height: 300px;
    overflow-y: auto;
`;

export const DropdownItem = styled.li`
    padding: 10px 15px;
    cursor: pointer;
    list-style: none;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f5f5f5;
    }
`;