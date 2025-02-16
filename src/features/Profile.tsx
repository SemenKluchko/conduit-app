import React, { useState } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "api/queryKeys";
import { Link, useNavigate, useParams } from "react-router-dom";
import {getProfile} from "api/queries/profile";
import UserIcon from "assets/icons/UserIcon.svg";
import { useFollowProfile } from "api/hooks/profile/useFollowProfile";
import { useUnfollowProfile } from "api/hooks/profile/useUnfollowProfile";
import { appRoutes } from "routes/appRoutes";
import { useAuth } from "context/AuthProvider";
import LoadingOverlay from "components/loading-overlay/LoadingOverlay";
import { getArticles } from "api/queries/articles";
import FeedList from "components/articles/Feeds";
import { getUser } from "api/queries/user";

export const Profile: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const queryCache = useQueryClient();
  const { username = '' } = useParams<{ username: string }>();
  const [isFavorited, setIsFavorited] = useState(false);
  
  const { data, isLoading: isProfileLoading } = useQuery(
      [queryKeys.getProfile, { username }],
      getProfile,
      { enabled: !!login }
  );

  const { data: userData } = useQuery(
      [queryKeys.getUser],
      getUser
  );

  const profile = data?.profile;
  const user = userData?.user;

  const profileRoute = appRoutes.profile.replace(':username', username);

  const { mutate: followProfile } = useFollowProfile();
  const { mutate: unfollowProfile } = useUnfollowProfile();

  const followMutate = profile?.following ? unfollowProfile : followProfile;

  const { data: articles, isLoading: isArticlesLoading } = useQuery(
      [queryKeys.getArticles, isFavorited ? { favorited: username } : { author: username }],
      getArticles,
  );

  const handleFollowProfile = () => {
    if (!login) {
      navigate(appRoutes.login);
      return;
    }

    followMutate({ username: profile?.username || '' }, {
      onSuccess: () => {
        queryCache.invalidateQueries([queryKeys.getProfile]);
      }
    });
  };


  if (isProfileLoading || isArticlesLoading) {
    return <LoadingOverlay />;
  }

  return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img alt="profile" src={profile?.image || UserIcon} className="user-img" />
                <h4>{profile?.username}</h4>
                <p>{profile?.bio}</p>
                {user?.username !== profile?.username && (<button
                    className={`btn btn-sm ${profile?.following ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => handleFollowProfile()}>
                  <i className="ion-plus-round" />
                  &nbsp; Follow {profile?.username}
                </button>)}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <Link
                        className={`nav-link ${isFavorited ? '' : 'active'}`}
                        to={profileRoute}
                        onClick={() => setIsFavorited(false)}
                    >
                      My Articles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                        className={`nav-link ${isFavorited ? 'active' : ''}`}
                        to={profileRoute}
                        onClick={() => setIsFavorited(true)}
                    >
                      Favorited Articles
                    </Link>
                  </li>
                </ul>
              </div>

              <FeedList isGlobal isLoading={isArticlesLoading} data={articles} />
            </div>
          </div>
        </div>
      </div>
  );
}
