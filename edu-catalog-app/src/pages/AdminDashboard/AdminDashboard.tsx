import React from 'react';
import AdminUserInfo from './AdminUserInfo/AdminUserInfo';

const AdminDashboard = () => {
  return (
    <div className="flex justify-center min-h-screen bg-base-200 rounded-2xl">
      <div className="card-body">
        <AdminUserInfo />
        {/* <h2 className="card-title">{course.title}</h2>
            <p>{course.description}</p>
            <div className="badge badge-info mt-2">Duration: {course.weeks} weeks</div>
            <div className="badge badge-success mt-2">
              {course.scholarshipAvailable ? 'Scholarships Available' : 'No Scholarships'}
            </div>
            <p className="mt-2">Tuition: ${course.tuition.toLocaleString()}</p>
            <p className="mt-2">Skill Level: {course.minimumSkill}</p>
            <p className="text-xs text-gray-500 mt-4">Created at: {new Date(course.createdAt).toLocaleDateString()}</p> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
