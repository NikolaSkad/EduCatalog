import CollapsibleForm from '@/components/ColasibleForm/ColasibleForm';
import { Bootcamp, CreateBootcampPayload } from '@/interface/bootcamp';
import { createBootcamp } from '@/services/bootcamp';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const bootcampFields = [
  {
    name: 'name',
    label: 'Bootcamp Name',
    type: 'text',
    placeholder: 'Enter bootcamp name',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter bootcamp description',
    required: true,
  },
  {
    name: 'website',
    label: 'Website',
    type: 'url',
    placeholder: 'https://yourbootcamp.com',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '+123456789',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'info@bootcamp.com',
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    placeholder: '123 Main St, City, Country',
    required: true,
  },
  {
    name: 'photo',
    label: 'Photo (filename or URL)',
    type: 'text',
    placeholder: 'e.g. bootcamp-photo.jpg or full URL',
  },
];

const booleanFields = [
  {
    name: 'housing',
    label: 'Housing',
  },
  {
    name: 'jobAssistance',
    label: 'Job Assistance',
  },
  {
    name: 'jobGuarantee',
    label: 'Job Guarantee',
  },
];

const careersOptions = [
  'Web Development',
  'Mobile Development',
  'UI/UX',
  'Data Science',
  'Business',
  'Other',
  'AI Development',
  'Blockchain Development',
  'Backend Development',
  'Full Stack Development',
];

const AddBootcampForm = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const { mutate } = useMutation<Bootcamp, Error, CreateBootcampPayload>({
    mutationFn: createBootcamp,
    onSuccess: (bootcamp) => {
      toast.success('Bootcamp created successfully!');
      queryClient.invalidateQueries({ queryKey: ['all-bootcamps'] });
      queryClient.invalidateQueries({ queryKey: ['bootcamps-publisher'] });
    },
    onError: (error) => {
      toast.error(error.message || 'An error occurred while creating the bootcamp.', { duration: 5000 });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <CollapsibleForm title="Add Bootcamp" onSubmit={handleSubmit(onSubmit)}>
      <div className="cards space-y-5">
        {/* Input/Textarea fields */}
        {bootcampFields.map(({ name, label, type, placeholder, required }) => (
          <div key={name}>
            <label className="label">
              <span className="label-text">{label}</span>
            </label>

            {type === 'textarea' ? (
              <textarea
                placeholder={placeholder}
                {...register(name, required ? { required: `${label} is required` } : {})}
                className="textarea textarea-bordered w-full"
              />
            ) : (
              <input
                type={type}
                placeholder={placeholder}
                {...register(name, required ? { required: `${label} is required` } : {})}
                className="input input-bordered w-full"
              />
            )}
          </div>
        ))}

        {/* Careers field */}
        <div>
          <label className="label">
            <span className="label-text">Career</span>
          </label>
          <select {...register('careers')} className="select select-bordered w-full" defaultValue="">
            <option value="" disabled>
              Select a career
            </option>
            {careersOptions.map((career) => (
              <option key={career} value={career}>
                {career}
              </option>
            ))}
          </select>
        </div>

        <div>
          {booleanFields.map(({ name, label }) => (
            <div className="form-control hover:bg-base-200 px-3 py-1.5 transition-50 rounded-lg" key={name}>
              <label className="label cursor-pointer">
                <span className="label-text">{label}</span>
                <input type="checkbox" className="toggle" {...register(name)} />
              </label>
            </div>
          ))}
        </div>
      </div>
    </CollapsibleForm>
  );
};

export default AddBootcampForm;
