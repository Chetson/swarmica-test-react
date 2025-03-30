import { useAppStore } from './shared/store'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Categories, Locales, Search } from './components'
import styled from 'styled-components'

function App() {
    const { isLoaded, appBootstrap, articleBody } = useAppStore()

    useEffect(() => {
        appBootstrap()
    }, [])

    if (!isLoaded) return 'Loading...'

    return (
        <>
            <Header>
                <Locales />
                <Categories />
                <Search />
            </Header>
            <main>
                {articleBody !== null && (
                    <ReactMarkdown>{articleBody}</ReactMarkdown>
                )}
            </main>
        </>
    )
}

const Header = styled.header`
    background: #e5e5e5;
    padding: 12px 24px;
    display: flex;
    gap: 8px;
`

export default App
