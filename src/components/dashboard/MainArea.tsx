import Home from '../../pages/Home';
import Projects from '../../pages/Projects';

type Props = {
	activeButton: string | null;
};

const MainArea = ({ activeButton }: Props) => {
	let component = null;
	if (activeButton === 'Home') {
		component = <Home />;
	} else if (activeButton === 'Projects') {
		component = <Projects />;
	}
	return <>{component}</>;
};

export default MainArea;
