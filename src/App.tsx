import AuthProvider from "./context/AuthProvider";
import Routers from "./Routers";

const App = () => {
	return (
		<AuthProvider>
			<Routers />
		</AuthProvider>
	);
};

export default App;
