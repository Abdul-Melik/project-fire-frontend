import Home from '../../pages/Home';
import Projects from '../../pages/Projects';
import Employees from '../../pages/Employees';
import FinancialOverview from '../../pages/FinancialOverview';
import ProjectReporting from '../../pages/ProjectReporting';
import Invoicing from '../../pages/Invoicing';

type Props = {
	activeButton: string | null;
};

const MainArea = ({ activeButton }: Props) => {
	let component = <Home />;
	if (activeButton === 'Projects') {
		component = <Projects />;
	} else if (activeButton === 'Employees') {
		component = <Employees />;
	} else if (activeButton === 'FinancialOverview') {
		component = <FinancialOverview />;
	} else if (activeButton === 'ProjectReporting') {
		component = <ProjectReporting />;
	} else if (activeButton === 'Invoicing') {
		component = <Invoicing />;
	}
	return <>{component}</>;
};

export default MainArea;
