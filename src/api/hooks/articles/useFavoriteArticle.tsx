import { useMutation } from "@tanstack/react-query";
import { Article, ArticleData } from "api/types/article";
import { APIError } from "api/types/response";
import { favoriteArticle } from "api/queries/articles";

export const useFavoriteArticle = () => {
    return useMutation<ArticleData<Article>, APIError, { slug: string; }>(favoriteArticle);
};
