import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Endpoints from '../constants/url'

export default
    function EmployeeBtnForAdd() {

    return (
        <Link
            to={Endpoints.employees.createNew}
        >
            <Button
                variant="primary"
                className="mb-4"
            >
                Add Employee
            </Button>
        </Link>
    )
}