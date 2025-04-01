import BootcampCard from '@/components/BootcampCard/BootcampCard';
import ShowAt from '@/components/ShowAt/ShowAt';
import { getBootcampsForPublisher } from '@/services/bootcamp';
import { useQuery } from '@tanstack/react-query';

const PublisherBootcamps = () => {
  const { data: bootcamps = [] } = useQuery({ queryKey: ['bootcamps-publisher'], queryFn: getBootcampsForPublisher });

  return (
    <div>
      <h2 className="card-title mb-4">Your bootcamps</h2>
      <div className="max-w-[450px]">
        {bootcamps.map((bootcamp) => (
          <BootcampCard {...bootcamp} key={bootcamp._id} />
        ))}
      </div>
    </div>
  );
};

export default PublisherBootcamps;
