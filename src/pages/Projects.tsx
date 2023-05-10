import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";

import AuthContext from "src/shared/context/auth-context";
import Modal from "src/shared/components/utils/Modal";
import LoadingSpinner from "src/shared/components/utils/LoadingSpinner";
import Navbar from "src/shared/components/navbar/Navbar";
import MainLayout from "src/shared/components/layout/MainLayout";
import ProjectsTable from "src/components/projects/ProjectsTable";

enum ProjectType {
  Fixed = "fixed",
  OnGoing = "on-going",
}

enum SalesChannel {
  Online = "online",
  InPerson = "in-person",
  Referral = "referral",
  Other = "other",
}

interface Project {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  actualEndDate: Date;
  projectType: ProjectType;
  hourlyRate: number;
  projectValueBAM: number;
  salesChannel: SalesChannel;
  finished: boolean;
}

const Projects = () => {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const getProjects = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/projects`, {
        headers: { Authorization: "Bearer " + token },
      });
      setProjects(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error);
      } else {
        console.error("Unexpected error: ", error);
      }
    }
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    if (token) getProjects();
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navLabels = ["All Projects", "Active", "Inactive", "Completed"];

  return (
    <>
      <Modal
        onCancel={() => setError(null)}
        header="An error occurred!"
        show={!!error}
        isError={!!error}
      >
        <p>{error}</p>
      </Modal>
      <MainLayout activeMenuItem={"projects"}>
        <div className="mx-14 my-[34px]">
          <div className="flex items-center justify-between">
            <div className="font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest">
              Projects
            </div>
            <button
              className="rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]"
              onClick={() => {}}
            >
              Create new project
            </button>
          </div>
          <div className="mt-[30px] flex flex-col">
            <div className="mb-12">
              <Navbar
                navLabels={navLabels}
                handlePageSelect={(page) => setActivePage(page)}
              />
            </div>
            <ProjectsTable />
            {isLoading ? <LoadingSpinner /> : null}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Projects;
