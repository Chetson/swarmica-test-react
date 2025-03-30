import styled from "styled-components";

export const SelectContainer = styled.div`
    position: relative;
    width: 450px;
    height: 40px;
    max-width: 300px;
`;

export const SelectHeader = styled.div<{ $isOpen: boolean }>`
    padding: 7px 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
    border-color: ${props => (props.$isOpen ? '#1890ff' : '#ccc')};
    box-shadow: ${props => (props.$isOpen ? '0 0 0 2px rgba(100, 108, 255, 0.2)' : 'none')};

    &:hover {
        border-color: #1890ff;
    }
`;

export const ArrowIcon = styled.span<{ $isOpen: boolean }>`
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;
    transform: ${props => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
    width: 16px;
    height: 16px;
    color: #666;
`;

export const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 5px;
    padding: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
`;

export const DropdownItem = styled.li<{ $isSelected: boolean }>`
    padding: 8px 12px;
    cursor: pointer;
    background-color: ${props => (props.$isSelected ? '#f0f0f0' : 'white')};
    color: ${props => (props.$isSelected ? '#1890ff' : '#333')};

    &:hover {
        background-color: #f5f5f5;
    }
`;