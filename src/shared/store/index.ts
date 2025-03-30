import {create, StoreApi, UseBoundStore} from 'zustand'
import {fetchArticles, fetchCategories, fetchLocales} from "../api";

const DEFAULT_LOCALE = import.meta.env.VITE_LOCALE as string

interface AppStoreInterface {
    isLoaded: boolean;
    setAppLoaded: (payload: boolean) => void;
    setLocale: (payload: string) => void;
    setCategory: (payload: number) => void;
    locales: string[];
    currentLocale: string | typeof DEFAULT_LOCALE;
    categories: Array<CategoryType>;
    currentCategoryId: number;
    currentCategory: CategoryType | null;
    appBootstrap: () => void;
    fetchArticles: (query: string) => Promise<any>;
    articleBody: string | null;
    setArticleBody: (payload: string | null) => void;
}

type AppStoreType = UseBoundStore<StoreApi<AppStoreInterface>>

type CategoryType = {
    id: number;
    image_path: string;
    name: Record<string, string>;
    public: boolean;
}

export const useAppStore: AppStoreType = create((set, get) => ({
    isLoaded: false,
    isAuthenticated: false,
    userCredentials: {},
    locales: [],
    currentLocale: DEFAULT_LOCALE,
    categories: [],
    currentCategoryId: 0,
    currentCategory: null,
    articleBody: null,
    setAppLoaded: (payload) => {
        set({isLoaded: payload})
    },
    setLocale: (payload) => {
        set({currentLocale: payload})
    },
    setCategory: (payload) => {
        set((state) => ({currentCategory: state.categories.find(category => category.id === payload)}))
        set({currentCategoryId: payload})
    },
    appBootstrap: async () => {
        const localesResponse = await fetchLocales()
        if (localesResponse.status === 200 && localesResponse.data) {
            set({
                locales: localesResponse.data.locales,
                currentLocale: localesResponse.data.default_locale
            })
        }
        const categoriesResponse = await fetchCategories()
        if (categoriesResponse.status === 200) {
            set({
                categories: categoriesResponse.data
            })
        }

        set({isLoaded: true})
    },
    fetchArticles: async (query) => {
        const { currentLocale, currentCategoryId } = get()
        return await fetchArticles(query, currentCategoryId, currentLocale)
    },
    setArticleBody: (payload) => {
        set({articleBody: payload})
    }
}))