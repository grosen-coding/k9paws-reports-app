
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createReport, reset} from '../features/reports/reportSlice'
import Loading from '../components/Loading'
import BackButton from '../components/BackButton'

function NewReport() {
const {client} = useSelector((state) => state.auth)
const {isLoading, isError, isSuccess, message}= useSelector((state) => state.reports)

const [name] = useState(client.name) 
const [email] = useState(client.email)
const [category, setCategory] = useState('Select') 
const [description, setDescription] = useState('') 

const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(() => {
    if(isError) {
        toast.error(message)
    }

    if(isSuccess) {
        dispatch(reset())
        navigate('/reports')
    }

    dispatch(reset())
}, [dispatch, isError, isSuccess, navigate, message])

const onSubmit = 
(e) => {
    e.preventDefault()
    dispatch(createReport({category, description}))
}

if(isLoading) {
    return <Loading />
}

  return (
    <section className='new-report wrapper'>

        <div className="new-report-container">

            <BackButton url="/reports" />

            <div className="new-report-heading">
                <h1>Create a New <strong>K<span className='logo--nine'>9</span>PAWS</strong> Progress Report</h1>
                <p>Please fill out the form below to add a new report to your progress. Remember to make sure to always fill out a new report for each individual question, update or incident.</p>
            </div>

            <div className="form">
                <div className="form-group">
                    <label htmlFor="name">Client Name</label>
                    <input type="text" className="form-control" value={name} disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Client Email</label>
                    <input type="text" className="form-control" value={email} disabled />
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Select" disabled>Please choose a Category</option>
                                <option value="Update">Update</option>
                                <option value="Question">Question</option>
                                <option value="Positive Experience">Positive Experience</option>
                                <option value="Negative Incident">Negative Incident</option>
                            </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Brief Description</label>
                        <textarea name="description" id="description" className='form-control' placeholder='Please write a brief description...' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit
                        </button>
                    </div>
                    
                </form>
            </div>

        </div>
    </section>
  )
}

export default NewReport