import React from 'react';
import { User } from '@/interface/user';
import ExpandableSection from '@/components/ExpandableSection/ExpandableSection';

const UserInfo: React.FC<User> = ({ name, role, email }) => {
  return (
    <ExpandableSection title="Your Info">
      <div className="card bg-base-100 shadow-xl p-6 max-w-md mx-auto">
        <div className="card-body">
          <h2 className="card-title text-primary">User Information</h2>

          <div className="space-y-3">
            {/* Name */}
            <div className="flex items-center justify-between">
              <span className="badge badge-primary font-bold">Name</span>
              <span className="text-lg text-gray-700">{name}</span>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between">
              <span className="badge badge-secondary font-bold">Email</span>
              <span className="text-lg text-gray-700">{email}</span>
            </div>

            {/* Role */}
            <div className="flex items-center justify-between">
              <span className="badge badge-accent font-bold">Role</span>
              <span className="text-lg text-gray-700">{role}</span>
            </div>
          </div>
        </div>
      </div>
    </ExpandableSection>
  );
};

export default UserInfo;
