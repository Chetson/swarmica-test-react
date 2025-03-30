import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useAppStore } from '../../shared/store'
import {
    Dropdown,
    DropdownItem,
    InputWrapper,
    SearchContainer,
    Spinner,
    StyledInput,
} from './styles.ts'

export interface SearchResult {
    id: string
    title: Record<string, string>
    body: Record<string, string>
}

interface SearchInputProps {
    search: (query: string) => Promise<{ data: SearchResult[]; status: number }>
    onSelect: (item: SearchResult) => void
    placeholder?: string
    minChars?: number
    debounceDelay?: number
    maxResults?: number
}

export const SearchInput: React.FC<SearchInputProps> = ({
    search,
    onSelect,
    placeholder = 'Поиск...',
    minChars = 2,
    debounceDelay = 500,
    maxResults = 10,
}) => {
    const [query, setQuery] = useState('')
    const [displayQuery, setDisplayQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const ignoreNextUpdate = useRef(false)
    const { currentLocale } = useAppStore()
    const viewedArticles = localStorage.getItem('viewedArticles')
    const parsed = viewedArticles !== null ? viewedArticles.split(',') : []

    const fetchResults = useCallback(
        async (searchQuery: string) => {
            if (searchQuery.length < minChars) {
                setResults([])
                return
            }

            setIsLoading(true)
            try {
                const { data } = await search(searchQuery)
                const filtered = data.filter(
                    (article: SearchResult) => article.title[currentLocale]
                )

                setResults(filtered.slice(0, maxResults))
                setIsDropdownOpen(filtered.length > 0)
            } catch (error) {
                console.error('Ошибка запроса:', error)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        },
        [search, minChars, maxResults]
    )

    useEffect(() => {
        if (ignoreNextUpdate.current) {
            ignoreNextUpdate.current = false
            return
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        if (query.length >= minChars) {
            timeoutRef.current = setTimeout(() => {
                fetchResults(query)
            }, debounceDelay)
        } else {
            setResults([])
            setIsDropdownOpen(false)
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [query, fetchResults, minChars, debounceDelay])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        setDisplayQuery(value)
    }

    const handleResultClick = (item: SearchResult) => {
        ignoreNextUpdate.current = true
        setQuery(item.title[currentLocale])
        setDisplayQuery(item.title[currentLocale])
        setResults([])
        setIsDropdownOpen(false)
        onSelect(item)
    }

    const handleInputBlur = () => {
        setTimeout(() => setIsDropdownOpen(false), 200)
    }

    const handleInputFocus = () => {
        if (results.length > 0) {
            setIsDropdownOpen(true)
        }
    }

    return (
        <SearchContainer>
            <InputWrapper>
                <StyledInput
                    ref={inputRef}
                    type='text'
                    value={displayQuery}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder={placeholder}
                />
                {isLoading && <Spinner />}
            </InputWrapper>

            {isDropdownOpen && results.length > 0 && (
                <Dropdown>
                    {results.map(item => (
                        <DropdownItem
                            key={item.id}
                            onClick={() => handleResultClick(item)}
                            $viewed={parsed.indexOf(String(item.id)) !== -1}
                        >
                            {item.title[currentLocale]}
                        </DropdownItem>
                    ))}
                </Dropdown>
            )}
        </SearchContainer>
    )
}
