
import axios, {AxiosResponse} from "axios";

const API_URL = import.meta.env.VITE_API_URL

interface ApiSuccessResponse<T> {
    status: 200;
    data: T;
}

interface ApiErrorResponse {
    status: number;
    data?: never;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

async function makeRequest<T>(
    endpoint: string,
    params?: Record<string, any>,
    dataTransformer?: (data: any) => T
): Promise<ApiResponse<T>> {
    try {
        const response: AxiosResponse = await axios.get(`${API_URL}${endpoint}`, {
            params
        });

        if (response.status === 200) {
            return {
                status: response.status,
                data: dataTransformer ? dataTransformer(response.data) : response.data
            };
        }

        return {status: response.status};
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                status: error.response?.status || 500
            };
        }
        return {
            status: 500
        };
    }
}

interface LocalesData {
    locales: string[];
    default_locale: string;
}

export const fetchLocales = async (): Promise<ApiResponse<LocalesData>> => {
    return makeRequest<LocalesData>('/instance/', {}, ({ locales, default_locale}) => {
        return {
            locales,
            default_locale,
        }
    });
};

export const fetchCategories = async () => {
    return makeRequest('/categories/', { public: true }, (data) => data.results);
};

export const fetchArticles = async (query: string, category: number, locale: string) => {
    return makeRequest('/articles/', {
        query,
        category: category || null,
        locale,
        status: 'PUBLISHED'
    }, (data) => data.results);
};