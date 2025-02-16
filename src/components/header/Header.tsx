import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "context/AuthProvider";
import ProfileItem from './ProfileItem';
import { appRoutes } from "routes/appRoutes";
import { NavItem } from "components/header/NavItem";

export const Header: React.FC = () => {
  const { login } = useAuth();

  return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" to={appRoutes.main}>conduit</Link>
          <ul className="nav navbar-nav pull-xs-right">
            <NavItem to={appRoutes.main}>Home</NavItem>
            {login ? (
                <>
                    <NavItem to={appRoutes.editor}>
                    <i className="ion-compose" />
                    &nbsp;New Article
                    </NavItem>
                  <NavItem to={appRoutes.settings}>
                    <i className="ion-gear-a" />
                    &nbsp;Settings
                  </NavItem>
                  <ProfileItem />
                </>
            ) :
            <>
              <NavItem to={appRoutes.login}>Sign in</NavItem>
              <NavItem to={appRoutes.register}>Sign up</NavItem>
            </>}
          </ul>
        </div>
      </nav>
  );
};
