import {Link} from 'react-router-dom'

function ReportItem({report}) {



  return (
    <div className="report">
        <div>{new Date(report.createdAt).toLocaleString('en-US')}</div>
        <div>{report.category}</div>
        <div className={`status status-${report.status}`}>
            {report.status}
        </div>
        <Link to={`/report/${report._id}`} className="btn btn-reverse btn-sm">View</Link>
    </div>
  )
}

export default ReportItem