import AddUserForm from './AddUserForm/AddUserForm';
import UserList from './UserList/UserList';

const AdminUserInfo = () => {
  return (
    <div className="p-4 space-y-5">
      <UserList />
      <AddUserForm />
    </div>
  );
};

export default AdminUserInfo;
