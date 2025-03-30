import { SearchInput } from '../SearchInput'
import { useAppStore } from '../../shared/store'
import { SearchResult } from '../SearchInput/SearchInput.tsx'

export const Search = () => {
    const { fetchArticles, currentLocale, setArticleBody } = useAppStore()

    const handleSearch = async (query: string) => {
        return fetchArticles(query)
    }

    const handleSelect = (item: SearchResult) => {
        const value = item.id
        const viewedArticles = localStorage.getItem('viewedArticles')

        if (viewedArticles === null) {
            localStorage.setItem('viewedArticles', value)
        } else {
            const parsed = viewedArticles.split(',')
            if (parsed.indexOf(String(value)) === -1) {
                localStorage.setItem(
                    'viewedArticles',
                    [...viewedArticles.split(','), String(value)].join(',')
                )
            }
        }

        setArticleBody(item.body[currentLocale])
    }

    return (
        <div>
            <SearchInput
                search={handleSearch}
                onSelect={handleSelect}
                placeholder='Давайте найдем что-нибудь'
                minChars={2}
                debounceDelay={500}
                maxResults={10}
            />
        </div>
    )
}
