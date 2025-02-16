import React from 'react';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { queryKeys } from "api/queryKeys";
import { getArticle } from "api/queries/articles";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingOverlay from "components/loading-overlay/LoadingOverlay";
import UserIcon from "assets/icons/UserIcon.svg";
import { appRoutes } from "routes/appRoutes";
import { formatDate } from "components/articles/utils";
import { useFavoriteArticle } from "api/hooks/articles/useFavoriteArticle";
import { useUnfavoriteArticle } from "api/hooks/articles/useUnfavoriteArticle";
import { useAuth } from "context/AuthProvider";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useFollowProfile } from "api/hooks/profile/useFollowProfile";
import { useUnfollowProfile } from "api/hooks/profile/useUnfollowProfile";

export const Article: React.FC = () =>  {
  const { login } = useAuth();
  const navigate = useNavigate();
  const queryCache = useQueryClient();
  const { slug = '' } = useParams<{ slug: string }>();
  const { data, isLoading } = useQuery(
      [queryKeys.getArticle, { slug }],
      getArticle
  );

  const article = data?.article;

  const { mutate: favoriteArticle } = useFavoriteArticle();
  const { mutate: unfavoriteArticle } = useUnfavoriteArticle();
  const { mutate: followProfile } = useFollowProfile();
  const { mutate: unfollowProfile } = useUnfollowProfile();

  const favoriteMutate = article?.favorited ? unfavoriteArticle : favoriteArticle;
  const followMutate = article?.author.following ? unfollowProfile : followProfile;

  const handleFavoritePost = () => {
    if (!login) {
      navigate(appRoutes.login);
      return;
    }

    favoriteMutate({ slug }, {
      onSuccess: () => {
        queryCache.invalidateQueries([queryKeys.getArticle]);
      }
    });
  }

  const handleFollowProfile = () => {
    if (!login) {
      navigate(appRoutes.login);
      return;
    }

    followMutate({ username: article?.author.username || '' }, {
      onSuccess: () => {
        queryCache.invalidateQueries([queryKeys.getArticle]);
      }
    });
  }

  const profileRoute = appRoutes.profile.replace(':username', article?.author?.username || '');

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article?.title}</h1>

            <div className="article-meta">
              <Link to={profileRoute}>
                <img src={article?.author.image || UserIcon} alt="profile" />
              </Link>
              <div className="info">
                <Link to={profileRoute} state={article?.author.username} className="author">
                  {article?.author.username}
                </Link>
                <span className="date">{formatDate(article?.createdAt || '')}</span>
              </div>
              <button className={`btn btn-sm ${article?.author.following ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => handleFollowProfile()}>
                <i className="ion-plus-round" />
                &nbsp; Follow {article?.author.username}
              </button>
              &nbsp;&nbsp;
              <button className={`btn ${article?.favorited ? 'btn-primary' : 'btn-outline-primary'} btn btn-sm`} onClick={() => handleFavoritePost()}>
                <i className="ion-heart" />
                &nbsp; Favorite Post <span className="counter">{`(${article?.favoritesCount})`}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{article?.body || ''}</ReactMarkdown>
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <Link to={profileRoute}>
                <img src={article?.author.image || UserIcon} alt="profile" />
              </Link>
              <div className="info">
                <Link to={profileRoute} state={article?.author.username} className="author">
                  {article?.author.username}
                </Link>
                <span className="date">{formatDate(article?.createdAt || '')}</span>
              </div>
              <button className={`btn btn-sm ${article?.author.following ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => handleFollowProfile()}>
                <i className="ion-plus-round" />
                &nbsp; Follow {article?.author.username}
              </button>
              &nbsp;
              <button className={`btn ${article?.favorited ? 'btn-primary' : 'btn-outline-primary'} btn btn-sm`} onClick={() => handleFavoritePost()}>
                <i className="ion-heart" />
                &nbsp; Favorite Post <span className="counter">{`(${article?.favoritesCount})`}</span>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea className="form-control" placeholder="Write a comment..." rows={3} />
                </div>
                <div className="card-footer">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  <button className="btn btn-sm btn-primary">Post Comment</button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-edit" />
                    <i className="ion-trash-a" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
