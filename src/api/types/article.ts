export interface ArticlesQueryParams {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
}

export interface ArticlesData<T> {
    articles: T;
    articlesCount: number;
}

export interface ArticleData<T> {
    article: T;
}

export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[],
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number,
    author: {
        username: string;
        bio: string;
        image: string;
        following: boolean;
    }
}