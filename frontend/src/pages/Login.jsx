import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Loading from '../components/Loading'


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {client, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)


 useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        // Redirect when logged in
        if(isSuccess || client) {
            navigate('/reports')
        }

        dispatch(reset())
    }, [isError, isSuccess, client, message, navigate, dispatch]) 

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // Construct Client
        const clientData = {
            email,
            password
        }

        dispatch(login(clientData))
    }

    if (isLoading) {
        return <Loading />
    }

    return (

    <section className='login wrapper'>

        <div className="login-container">
            <div className="login-heading">
                <h1>
                    <FaSignInAlt /> Reporting Login
                </h1>
                <p>If you're currently a client of <strong>K<span className='logo--nine-sm'>9</span>PAWS</strong>, please log-in to access your <strong>Training Reports</strong></p>
            </div>

            <div className="form">
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <input 
                        type="email" 
                        className="form-control" 
                        id='email' name="email" 
                        value={email} 
                        onChange={onChange} 
                        placeholder="Enter your email address" 
                        required />
                    </div>
                    <div className="form-group">
                        <input 
                        type="password" 
                        className="form-control" 
                        id='password' 
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        placeholder="Enter a password" 
                        required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    </section>
    )
}

export default Login