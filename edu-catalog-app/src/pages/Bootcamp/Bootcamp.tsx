import CourseCard from '@/components/CourseCard/CourseCard';
import { getBootcampById } from '@/services/bootcamp';
import { getCoursesForBootcamp } from '@/services/courses';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Reviews from '@/components/Reviews/Reviews';
import BootcampAdminSection from './BootcampAdminSection/BootcampAdminSection';

const Bootcamp = () => {
  const { id } = useParams<{ id: string }>();

  const { data: bootcamp } = useQuery({ queryKey: ['bootcamp-by-id', id], queryFn: () => getBootcampById(id) });
  const { data: courses } = useQuery({
    queryKey: ['courses-for-bootcamp', id],
    queryFn: () => getCoursesForBootcamp(id),
  });

  const { name, description, photo } = bootcamp || {};

  return (
    <div>
      <BootcampAdminSection id={id} />
      {/* <div className="skeleton h-[350px] w-full"></div> */}
      <h1 className="text-center">{name}</h1>
      <div className="flex items-center gap-20 max-md:flex-col my-10">
        <div className="rounded-3xl w-[850px] min-h-[520px] overflow-hidden bg-base-200 mx-auto  flex-1 max-w-[calc(100dvw-24px)]">
          {photo && <img className="w-full h-full object-cover max-h-[600px]" src={bootcamp.photo} alt="Bootcamp" />}
        </div>
        <div className="bg-base-200 px-10 py-7 rounded-3xl md:max-w-[30%]">
          <p className=" text-lg font-semibold">
            {description}
            {description}
          </p>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-medium text-4xl mb-5">All Courses from this Bootcamp</h2>
        <div className="grid grid-cols-2 gap-5 max-2xl:grid-cols-1">
          {courses?.map((course) => <CourseCard key={course._id} {...course} />)}
        </div>
      </div>
      <Reviews id={id} />
    </div>
  );
};
export default Bootcamp;
