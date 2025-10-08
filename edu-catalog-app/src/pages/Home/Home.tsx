import BootcampCard from '@/components/BootcampCard/BootcampCard';
import { getAllBootcamps } from '@/services/bootcamp';
import { getAllCourses } from '@/services/courses';
import { useQuery } from '@tanstack/react-query';
import CoursesCarousel from './CoursesCarousel/CoursesCarousel';

const array = Array.from(Array(9).keys());

const Home = () => {
  const { data: bootcamps } = useQuery({ queryKey: ['all-bootcamps'], queryFn: getAllBootcamps });

  return (
    <div>
      <h1 className="mb-14">List of All Bootcamps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {bootcamps?.map((bootcamp) => <BootcampCard key={bootcamp.id} {...bootcamp} />)}
      </div>
      <section className="mt-40">
      <h1 className="mb-14">List of All Courses</h1>
        <CoursesCarousel />
      </section>
    </div>
  );
};

export default Home;
