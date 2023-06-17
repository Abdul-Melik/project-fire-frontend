import React from "react";

type Props = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
};

const ProjectForm: React.FC<Props> = ({ onSubmit, children }) => {
  return (
    <form className='flex w-full flex-col gap-4 overflow-y-auto rounded-md px-6 text-base' onSubmit={onSubmit}>
      <div className='flex w-full flex-col gap-4 rounded-md border bg-white p-3'>
        <div className='flex h-full w-full gap-4 p-3'>
          <div className='flex flex-1 flex-col gap-4'>{children}</div>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
