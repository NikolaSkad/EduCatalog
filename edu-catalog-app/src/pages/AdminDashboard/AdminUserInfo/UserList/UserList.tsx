import ExpandableSection from '@/components/ExpandableSection/ExpandableSection';
import { getAllUsers } from '@/services/user';
import { useQuery } from '@tanstack/react-query';
import DeleteUserBtn from '../DeleteUserBtn/DeleteUserBtn';
import EditUserAsAdminForm from './EditUserAsAdminForm/EditUserAsAdminForm';
import UserIcon from '@/assets/user-icon.svg?react';

const UserList = () => {
  const { data: users } = useQuery({ queryKey: ['all-users'], queryFn: getAllUsers });

  return (
    <ExpandableSection title="User List">
      <div>
        {users?.map(({ _id, name, email, role }) => (
          <div className="bg-base-100 rounded-lg shadow-md mb-2 p-2">
            <div key={_id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div
                      tabIndex={0}
                      className="bg-base-200 flex-center gap-0.5 text-neutral-content w-12 rounded-full"
                    >
                      <UserIcon className="w-[25px] h-[25px]" />
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{name}</div>
                    <div className="text-sm text-gray-500">{email}</div>
                  </div>
                </div>
                <div>
                  <DeleteUserBtn id={_id} />
                </div>
              </div>
            </div>
            <EditUserAsAdminForm id={_id} name={name} email={email} role={role} />
          </div>
        ))}
      </div>
    </ExpandableSection>
  );
};

export default UserList;
