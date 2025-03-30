import React, { useState, useRef, useEffect } from 'react'
import {
    ArrowIcon,
    DropdownItem,
    DropdownList,
    SelectContainer,
    SelectHeader,
} from './styles.ts'

interface Option {
    value: number
    label: string
}

interface SelectProps {
    options: Option[]
    defaultValue?: number
    onChange?: (value: number) => void
    placeholder?: string
}

export const Select: React.FC<SelectProps> = ({
    options,
    defaultValue = 0,
    onChange,
    placeholder = 'Select...',
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(defaultValue)
    const selectRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find(
        option => Number(option.value) === Number(selectedValue)
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleOptionClick = (value: number) => {
        setSelectedValue(value)
        onChange?.(value)
        setIsOpen(false)
    }

    return (
        <SelectContainer ref={selectRef}>
            <SelectHeader onClick={toggleDropdown} $isOpen={isOpen}>
                {selectedOption ? selectedOption.label : placeholder}
                <ArrowIcon $isOpen={isOpen}>
                    <svg viewBox='0 0 20 20' fill='currentColor'>
                        <path
                            fillRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                            clipRule='evenodd'
                        />
                    </svg>
                </ArrowIcon>
            </SelectHeader>
            {isOpen && (
                <DropdownList>
                    {options.map(option => (
                        <DropdownItem
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            $isSelected={
                                Number(option.value) === Number(selectedValue)
                            }
                        >
                            {option.label}
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </SelectContainer>
    )
}
