import './App.css';
import { Routes, Route } from 'react-router-dom'
import urls from './constants/url'
import EmployeeList from './components/EmployeesView';
import CreateNewEmployeeForm from './components/CreateNewEmployeeForm'
import RegisterForm from "./components/Register"
import LoginForm from "./components/Login"
import ReadEmployee from './components/ReadEmployee';
import EditEmployeeForm from './components/EditEmployee';

function App() {

	return (
		<>
			<Routes>
				<Route path="/">
					<Route index element={<LoginForm />} />
					<Route path={urls.user.base} element={<LoginForm />} />
					<Route path={urls.user.login} element={<LoginForm />} />
					<Route path={urls.user.signUp} element={<RegisterForm />} />
					<Route path={`${urls.user.base}${urls.user.signUp}`} element={<RegisterForm />} />
				</Route>
				
				<Route path={urls.employees.base}>
					<Route index element={<EmployeeList />} />
					<Route path={urls.employees.createNew} element={<CreateNewEmployeeForm />} />
					<Route path={urls.employees.view} element={<ReadEmployee />} />
					<Route path={urls.employees.update} element={<EditEmployeeForm />} />
				</Route>

			</Routes>
		</>
	);
}

export default App;