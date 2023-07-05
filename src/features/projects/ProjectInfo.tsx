import { Project } from "src/types";
import { getProjectDate, getProjectValueBAM, getProjectActualEndDate, getProjectColorAndStatus } from "src/helpers";

type Props = {
  project: Project;
};

const ProjectInfo = ({ project }: Props) => {
  const endDate = project.actualEndDate ? project.actualEndDate : project.endDate;

  return (
    <div className='flex flex-col gap-4 rounded-lg bg-white p-6'>
      <div className='flex flex-col border-b border-ashen-grey pb-4'>
        <span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Name</span>
        <span className='font-gilroy-regular text-base font-normal text-slate-mist'>{project.name}</span>
      </div>
      <div className='flex flex-col border-b border-ashen-grey pb-4'>
        <span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Description</span>
        <span className='font-gilroy-regular text-base font-normal text-slate-mist'>{project.description}</span>
      </div>
      <div className='flex flex-col border-b border-ashen-grey pb-4'>
        <span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Duration</span>
        <span className='font-gilroy-regular text-base font-normal text-slate-mist'>
          {getProjectDate(project.startDate, project.endDate)}
        </span>
      </div>
      <div className='flex flex-col border-b border-ashen-grey pb-4'>
        <span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Actual End Date</span>
        <span className='font-gilroy-regular text-base font-normal text-slate-mist'>
          {getProjectActualEndDate(endDate)}
        </span>
      </div>
      <div className='flex flex-col border-b border-ashen-grey pb-4'>
        <span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Team members</span>
        <span className='font-gilroy-regular text-base font-normal text-slate-mist'>
          {project.employees.map(({ employee }) => `${employee.firstName} ${employee.lastName}`).join(", ")}
        </span>
      </div>
      <div className='flex flex-col border-b border-ashen-grey pb-4'>
        <span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Hourly Rate (USD)</span>
        <span className='font-gilroy-regular text-base font-normal text-slate-mist'>{project.hourlyRate}</span>
      </div>
      <div className='flex flex-col border-b border-ashen-grey pb-4'>
        <span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Project Value (BAM)</span>
        <span className='font-gilroy-regular text-base font-normal text-slate-mist'>
          {getProjectValueBAM(project.projectValueBAM)}
        </span>
      </div>
      <div className='flex flex-col border-b border-ashen-grey pb-4'>
        <span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Status</span>
        <div className='flex items-center gap-2'>
          <div className={`h-[6px] w-[6px] rounded-full ${getProjectColorAndStatus(project.projectStatus)?.color}`} />
          <div className='font-gilroy-regular font-normal text-slate-mist'>
            {getProjectColorAndStatus(project.projectStatus)?.status}
          </div>
        </div>
      </div>
      <div className='flex flex-col border-b border-ashen-grey pb-4'>
        <span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Project Type</span>
        <span className='font-gilroy-regular text-base font-normal text-slate-mist'>{project.projectType}</span>
      </div>
      <div className='flex flex-col'>
        <span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Sales Channel</span>
        <span className='font-gilroy-regular text-base font-normal text-slate-mist'>{project.salesChannel}</span>
      </div>
    </div>
  );
};

export default ProjectInfo;
