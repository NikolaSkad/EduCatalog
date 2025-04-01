import ExpandableSection from '@/components/ExpandableSection/ExpandableSection';
import { useAuthStore } from '@/store/auth';
import EditUserInfo from './EditUserInfo/EditUserInfo';
import UserInfo from './UserInfo/UserInfo';
import EditPassword from './EditPassword/EditPassword';

const UserDetails = () => {
  const { userInfo } = useAuthStore();

  return (
    <div className="flex justify-center min-h-screen bg-base-200 rounded-2xl">
      <div className="card-body space-y-10">
        <UserInfo {...userInfo} />
        <EditUserInfo />
        <EditPassword />
      </div>
    </div>
  );
};

export default UserDetails;
