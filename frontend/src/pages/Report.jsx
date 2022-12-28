import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'
import  {useSelector, useDispatch} from 'react-redux'
import {getReport, closeReport } from '../features/reports/reportSlice';
import {getNotes, createNote, reset as notesReset} from '../features/notes/noteSlice'
import {useParams, useNavigate} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Loading from '../components/Loading' 
import NoteItem from '../components/NoteItem' 

// Modal Styles
const customStyles = {
  content: {
    width: '60rem',
    height: '20rem',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative'
  }
}

Modal.setAppElement('#root')

function Report() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState("")

  const {report, isLoading, isSuccess, isError, message} = useSelector((state) => state.reports)

  const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {reportId} = useParams()

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    dispatch(getReport(reportId))
    dispatch(getNotes(reportId))
    
    // eslint-disable-next-line
  }, [isError, message, reportId])

// Close Report
const onReportClose = () =>
 {
   dispatch(closeReport(reportId))
   toast.success('Report Successfully Closed')
   navigate('/reports')
 }

//  Create note submit
const onNoteSubmit = (e) => {
  e.preventDefault()
  dispatch(createNote({noteText, reportId}))
  closeModal()
}

// Open/Close Modal
const openModal = () => setModalIsOpen(true)
const closeModal = () => setModalIsOpen(false)


  if(isLoading || notesIsLoading) {
    return <Loading />
  }

  if(isError) {
    return <h3>Something seems to have gone wrong...</h3>
  }

  return (
    <section className='wrapper'>
        <div className="report-container">
  
          <header className="report-header">
            <BackButton url='/reports/current-reports' />

            <div className="report-info">
              <h2>
                  Report ID: {report._id} &nbsp;
                  <span className={`status status-${report.status}`}>
                    {report.status}
                  </span>
                </h2>
                <h3>Date Submitted: {new Date(report.createdAt).toLocaleString('en-US')}</h3>
                <h3>Category: {report.category}</h3>
              </div>

              <div className="report-desc">
                <h3>Description</h3>
                <p>{report.description}</p>
              </div>

          </header>

          <h2>Notes</h2>

          {report.status !== 'closed' && (
            <button onClick={openModal} className="btn btn-note"><FaPlus /> Add Note</button>
          )}

          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Note">

          <h2>Add Note</h2>
          <button className="btn-close" onClick={closeModal}>X</button>
          
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea name="noteText" id="noteText" className='form-control' placeholder='Note text' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type='submit'>Submit</button>
            </div>

          </form>

        </Modal>

        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}

        {report.status !== 'closed' && (
          <button onClick={onReportClose} className="btn btn-block btn-danger">Close Report</button>
        )}
      </div>
    </section>
  )
}

export default Report