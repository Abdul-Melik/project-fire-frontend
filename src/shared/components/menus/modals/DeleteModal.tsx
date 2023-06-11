import React, { useContext } from "react";

import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import AuthContext from "src/shared/context/auth-context";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  projectId: string; // Add projectId prop
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete, projectId }) => {
  if (!isOpen) return null;

  const { token } = useContext(AuthContext);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleDeleteProject = async (projectId: string) => {
    try {
      await axios.delete(`${baseUrl}/api/projects/${projectId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (error: any) {
      toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
    }
  };

  const closeModal = () => {
    onClose();
  };

  const handleDelete = () => {
    handleDeleteProject(projectId); // Call handleDeleteProject with projectId
    closeModal();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-30'>
      <div className='relative rounded-md border-2 border-gray-400 bg-white p-4'>
        <button className='absolute right-0 top-0 p-2 pr-3 hover:text-red-900' onClick={closeModal}>
          <FontAwesomeIcon className='text-lg' icon={faTimes} />
        </button>
        <header className='mb-2 font-gilroy-medium text-2xl'>Delete Project</header>
        <hr className='bg-black' />
        <p className='mb-3 mt-3 font-gilroy-regular text-lg'>Are you sure you want to delete this project?</p>
        <hr />
        <div className='mt-2 flex justify-end'>
          <button
            className='mr-2 rounded bg-slate-mist px-5 py-2 font-gilroy-regular text-white  hover:bg-opacity-80 '
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className='bold rounded bg-[#c9473e] px-3 py-2 font-gilroy-regular text-white hover:bg-[#c0271c]'
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrashCan} className='mr-2' />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
