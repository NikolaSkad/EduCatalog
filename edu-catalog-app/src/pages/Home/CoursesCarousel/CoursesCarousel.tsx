import { Course } from '@/interface/course';
import { getAllCourses } from '@/services/courses';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const CoursesCarousel = () => {
  const { data: courses } = useQuery({ queryKey: ['all-courses'], queryFn: getAllCourses });

  const [isMobile, setIsMobile] = useState(false);
  const marqueeSpeed = isMobile ? 20 : 130;

  useEffect(() => {
    if (!window) return;
    setIsMobile(window.innerWidth <= 700);
  }, []);

  if (!courses) return null;

  return (
    <>
      <div className="absolute left-0 w-[100dvw]">
        <Marquee speed={marqueeSpeed} direction="right" pauseOnHover>
          {courses.map(({ image, _id, title }) => (
            <a href={'/course/' + _id}>
              <div key={_id} className="mr-4 rounded-xl overflow-hidden">
                <img src={image} alt={title} className="h-[280px] w-auto object-cover" />
              </div>
            </a>
          ))}
        </Marquee>
      </div>
      <div className="h-[280px]" />
    </>
  );
};

export default CoursesCarousel;
