import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Article } from "api/types/article";
import { formatDate } from "components/articles/utils";
import { useFavoriteArticle } from "api/hooks/articles/useFavoriteArticle";
import { useUnfavoriteArticle } from "api/hooks/articles/useUnfavoriteArticle";
import { useAuth } from "context/AuthProvider";
import { appRoutes } from "routes/appRoutes";
import UserIcon from 'assets/icons/UserIcon.svg'
import {useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "api/queryKeys";
interface Props {
    article: Article;
    isGlobal?: boolean;
}

export const Feed: React.FC<Props> = ({ article, isGlobal }) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const queryCache = useQueryClient();
    const { mutate: favoriteArticle } = useFavoriteArticle();
    const { mutate: unfavoriteArticle } = useUnfavoriteArticle()
    const { slug, author, favoritesCount, favorited, description, title, createdAt } = article;
    const favoriteMutate = favorited ? unfavoriteArticle : favoriteArticle;

    const profileRoute = appRoutes.profile.replace(':username', author.username);
    const articleRoute = appRoutes.article.replace( ':slug', slug );

    const handleClick = () => {
        if (!login) {
            navigate(appRoutes.login);
            return;
        }

        favoriteMutate({ slug }, {
            onSuccess: () => {
                if (isGlobal) {
                    queryCache.invalidateQueries([queryKeys.getArticles]);
                } else {
                    queryCache.invalidateQueries([queryKeys.getArticlesFeed]);
                }
            }
        });
    }

    return (
        <div role="presentation" className="article-preview">
            <div className="article-meta">
                <Link to={profileRoute}>
                    <img src={author.image || UserIcon} alt="profile" />
                </Link>
                <div className="info">
                    <Link to={profileRoute} state={author.username} className="author">
                        {author.username}
                    </Link>
                    <span className="date">{formatDate(createdAt)}</span>
                </div>
                <button
                    type="button"
                    className={`btn ${favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right`}
                    onClick={() => handleClick()}
                >
                    <i className="ion-heart"></i> {favoritesCount}
                </button>
            </div>
            <Link to={articleRoute} state={slug} className="preview-link">
                <h1>{title}</h1>
                <p>{description}</p>
                <span>Read more...</span>
            </Link>
        </div>
    );
};
