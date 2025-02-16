import React, {useState} from 'react';
import { useAuth } from "context/AuthProvider";
import {queryKeys} from "api/queryKeys";
import { useQuery } from '@tanstack/react-query';
import { getArticles, getArticlesFeed } from "api/queries/articles";
import FeedList from "components/articles/Feeds";

export const  Home: React.FC = () => {
  const { login } = useAuth();
  const [isGlobal, setIsGlobal] = useState(!login);

  const { data: articles, isLoading: isArticlesLoading } = useQuery(
      [queryKeys.getArticles, {}],
      getArticles,
      { enabled: isGlobal }
  );

  const { data: articlesFeed, isLoading: isArticlesFeedLoading } = useQuery(
      [queryKeys.getArticlesFeed, {}],
      getArticlesFeed,
      { enabled: !isGlobal && !!login }
  );


  const articlesData = isGlobal ? articles : articlesFeed;
  const isLoading = isGlobal ? isArticlesLoading : isArticlesFeedLoading;


  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {login && (
                      <li className="nav-item">
                        <button
                            className={`nav-link ${isGlobal ? '' : 'active'}`}
                            onClick={() => {
                              setIsGlobal(false);
                            }}
                            style={{ outline: 'unset' }}
                        >
                          Your Feed
                        </button>
                      </li>
                  )}
                  <li className="nav-item">
                    <button className={`nav-link ${isGlobal ? 'active' : ''}`} style={{ outline: 'unset' }} onClick={() => setIsGlobal(true)}>
                      Global Feed
                    </button>
                  </li>
                </ul>
              </div>

             <FeedList isGlobal={isGlobal} isLoading={isLoading} data={articlesData} />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" className="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    react
                  </a>
                  <a href="" className="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" className="tag-pill tag-default">
                    node
                  </a>
                  <a href="" className="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
