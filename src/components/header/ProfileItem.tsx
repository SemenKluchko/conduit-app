import { NavLink } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "api/queryKeys";
import UserIcon from "assets/icons/UserIcon.svg";
import { getUser } from "api/queries/user";
import { appRoutes } from "routes/appRoutes";

const ProfileItem = () => {
    const { data } = useQuery(
        [queryKeys.getUser],
        getUser
    );

    const user = data?.user;
    const userRoute = appRoutes.profile.replace(':username', user?.username || '')

  return (
    <li className="nav-item">
      <NavLink
        to={userRoute}
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        <img className="user-pic" src={user?.image || UserIcon} alt="profile" />
          {user?.username}
      </NavLink>
    </li>
  );
};

export default ProfileItem;
