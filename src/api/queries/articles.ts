import { QueryFunctionContext } from "@tanstack/react-query";
import {Article, ArticleData, ArticlesData, ArticlesQueryParams} from "api/types/article";
import { API_ENDPOINTS } from "api/endpoints";
import { ApiClient } from "api/apiClient";


export const getArticle = async ({ queryKey }: QueryFunctionContext<[string, { slug: string }]>): Promise<ArticleData<Article>> => {
    const [, { slug }] = queryKey;

    const { data } = await ApiClient.get<ArticleData<Article>>(
        API_ENDPOINTS.article.replace(':slug', slug)
    );

    return data;
};

export const getArticles = async ({ queryKey }: QueryFunctionContext<[string, ArticlesQueryParams]>) => {
    const [, params] = queryKey;

    const { data } = await ApiClient.get<ArticlesData<Article[]>>(
        API_ENDPOINTS.articles,
        {
            params,
        }
    );

    return data;
};

export const getArticlesFeed = async ({ queryKey }: QueryFunctionContext<[string, { limit?: number, offset?: number }]>) => {
    const [, params] = queryKey;
    const { data } = await ApiClient.get<ArticlesData<Article[]>>(
        API_ENDPOINTS.articlesFeed,
        {
            params
        }
    );

    return data;
};



export const favoriteArticle = async ({ slug }: { slug: string }): Promise<ArticleData<Article>> => {
   const { data } = await ApiClient.post<ArticleData<Article>>(
       API_ENDPOINTS.favoriteArticle.replace(':slug', slug)
   );

   return data;
};

export const unfavoriteArticle = async ({ slug }: { slug: string }): Promise<ArticleData<Article>> => {
    const { data } = await ApiClient.delete<ArticleData<Article>>(
        API_ENDPOINTS.favoriteArticle.replace(':slug', slug)
    );

    return data;
};




