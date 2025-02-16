import { useMutation } from "@tanstack/react-query";
import { Article, ArticleData } from "api/types/article";
import { APIError } from "api/types/response";
import { unfavoriteArticle } from "api/queries/articles";

export const useUnfavoriteArticle = () => {
    return useMutation<ArticleData<Article>, APIError, { slug: string; }>(unfavoriteArticle);
};
