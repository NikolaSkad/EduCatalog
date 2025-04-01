import ShowAt from '@/components/ShowAt/ShowAt';
import { User } from '@/interface/user';
import UserIcon from '@/assets/user-icon.svg?react';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

const UserAvatar: React.FC<User> = ({ name, role }) => {
  const navigate = useNavigate();
  const { loggoutUser } = useAuthStore();

  const handleRedirectToAdminDashboard = () => {
    navigate('admin-dashboard');
  };

  const handleRedirectToUserInfo = () => {
    navigate('user-info');
  };

  return (
    <ShowAt at={true}>
      <div className="avatar placeholder dropdown dropdown-end">
        <div
          tabIndex={0}
          className="bg-base-200 flex-center gap-0.5 text-neutral-content w-12 rounded-full cursor-pointer"
        >
          <UserIcon className="w-[25px] h-[25px]" />
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
          <li className="flex-center" onClick={handleRedirectToUserInfo}>
            <span>
              {name} ({role})
            </span>
          </li>
          <ShowAt at={role === 'admin'}>
            <li className="flex-center" onClick={handleRedirectToAdminDashboard}>
              <span>Admin Dashboard</span>
            </li>
          </ShowAt>
          <li>
            <button className="btn" onClick={loggoutUser}>
              LogOut
            </button>
          </li>
        </ul>
      </div>
    </ShowAt>
  );
};

export default UserAvatar;
