import styled from 'styled-components'

export const RadioGroup = styled.div`
    display: flex;
    gap: 8px;
    height: 40px;
`

export const RadioOption = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
        background-color: #f5f5f5;
    }
`

export const HiddenRadio = styled.input.attrs({ type: 'radio' })`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
`

export const StyledRadio = styled.div<{ checked: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 4px;
    background-color: ${({ checked }) => (checked ? '#e6f7ff' : 'transparent')};
    border: 1px solid ${({ checked }) => (checked ? '#1890ff' : '#d9d9d9')};
    transition: all 0.2s ease;

    &::before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid ${({ checked }) => (checked ? '#1890ff' : '#d9d9d9')};
        background-color: ${({ checked }) => (checked ? '#1890ff' : 'white')};
        box-shadow: ${({ checked }) =>
            checked ? 'inset 0 0 0 3px white' : 'none'};
        margin-right: 8px;
        transition: all 0.2s ease;
    }
`
export const LabelText = styled.span`
    font-size: 14px;
    color: #333;
`
