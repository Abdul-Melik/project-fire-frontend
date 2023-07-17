import { useState } from "react";

import { useGetProjectsInfoQuery } from "store/slices/projectsApiSlice";
import { useGetEmployeesInfoQuery } from "store/slices/employeesApiSlice";
import { useGetExpensesInfoQuery } from "src/store/slices/expensesApiSlice";

import LoadingSpinner from "components/utils/LoadingSpinner";
import YearSelector from "components/selectors/YearSelector";
import Navbar from "components/navigation/NavBar";
import MainLayout from "components/layout";
import Performance from "features/home/Performance";
import DevelopmentRevenueCosts from "features/home/DevelopmentRevenueCosts";
import Plan from "features/home/Plan";

const Home = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [activePage, setActivePage] = useState(1);

  const {
    isLoading: isProjectsInfoLoading,
    isFetching: isProjectsInfoFetching,
    isSuccess: isProjectsInfoSuccess,
    data: projectsInfo,
  } = useGetProjectsInfoQuery({ year: selectedYear });

  const {
    isLoading: isEmployeesInfoLoading,
    isFetching: isEmployeesInfoFetching,
    isSuccess: isEmployeesInfoSuccess,
    data: employeesInfo,
  } = useGetEmployeesInfoQuery({ year: selectedYear });

  const {
    isLoading: isExpensesInfoLoading,
    isFetching: isExpensesInfoFetching,
    isSuccess: isExpensesInfoSuccess,
    data: expensesInfo,
  } = useGetExpensesInfoQuery({ year: selectedYear });

  const navLabels = [`${selectedYear}  Performance`, "Development Revenue & Costs", `${selectedYear} Plan`];

  return (
    <MainLayout activeMenuItem={"home"}>
      <div className='mx-4 my-[34px] lg:mx-14'>
        <h1 className='mt-24 flex flex-1 justify-center font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest sm:justify-start lg:mt-0'>
          Home
        </h1>
        <div className='mt-[30px] flex flex-col'>
          <div className='mb-12 flex flex-wrap justify-center gap-4 lg:justify-between'>
            <Navbar navLabels={navLabels} handlePageSelect={(page) => setActivePage(page)} />
            <YearSelector selectedYear={selectedYear} handleYearSelection={(year) => setSelectedYear(year)} />
          </div>
          {isProjectsInfoLoading ||
          isProjectsInfoFetching ||
          isEmployeesInfoLoading ||
          isEmployeesInfoFetching ||
          isExpensesInfoLoading ||
          isExpensesInfoFetching ? (
            <LoadingSpinner />
          ) : (
            isProjectsInfoSuccess &&
            isEmployeesInfoSuccess &&
            isExpensesInfoSuccess && (
              <>
                {activePage === 1 && (
                  <Performance selectedYear={selectedYear} projectsInfo={projectsInfo} employeesInfo={employeesInfo} />
                )}
                {activePage === 2 && (
                  <DevelopmentRevenueCosts
                    selectedYear={selectedYear}
                    projectsInfo={projectsInfo}
                    expensesInfo={expensesInfo}
                  />
                )}
                {activePage === 3 && (
                  <Plan projectsInfo={projectsInfo} employeesInfo={employeesInfo} expensesInfo={expensesInfo} />
                )}
              </>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
