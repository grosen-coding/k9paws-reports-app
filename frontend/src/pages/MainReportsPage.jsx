import { Link } from 'react-router-dom'
import { FaPaw, FaRegListAlt} from 'react-icons/fa'

function MainReportsPage() {
    return (

        <section className='wrapper'>

            <div className="main-reports-container">
                <div className="main-reports-heading">
                    <h1><strong>K<span className='logo--nine'>9</span>PAWS</strong> Progress Reporting</h1>
                    <p>Please choose from an option below</p>
                </div>

                <Link to="/reports/new-report" className='btn btn-reverse btn-block'>
                    <FaPaw /> Create New Report
                </Link>

                <Link to="/reports/current-reports" className='btn btn-block'>
                    <FaRegListAlt /> View My Current Reports
                </Link>
            </div>
        </section>
    )
}

export default MainReportsPage