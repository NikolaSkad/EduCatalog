import ThemeDropdown from './ThemeDropdown/ThemeDropdown';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import LoginButton from './LoginButton/LoginButton';
import { useAuthStore } from '@/store/auth';
import { Link } from 'react-router-dom';

const Header = () => {
  const { userInfo } = useAuthStore();
  return (
    <header className="p-4">
      <div className="navbar bg-base-300 justify-between p-5 rounded-3xl">
        <Link to="/" className="btn btn-ghost text-xl">
          eduCatalog
        </Link>
        <div className="flex items-center gap-2">
          {!userInfo ? <LoginButton /> : <UserAvatar {...userInfo} />}
          <ThemeDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
