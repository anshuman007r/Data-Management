import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { REGEX, USERNAME, PASSWORD } from '../utils/WebUtil' 
import { loggedIn } from '../redux/action'
import TextInput from './common/TextInput'

function Login(props) {
    let [ userName, setUserName ] = useState('')
    let [ password, setPassword ] = useState('') 
    let [ errorUserName, setErrorUserName ] = useState(false)
    let [ errorPassword, setErrorPassword ] = useState(false)
    let [ invalidDataError,setinvalidDataError] = useState(false)
    const dispatch = useDispatch()
    

    const changeUserNameInput = (event) =>{
        setinvalidDataError(false)
        let { value } = event.target
        setUserName(value)
        setErrorUserName(false)
    }
    
    const validateUserName = () =>{
        if(REGEX.username.test(userName)){
            setErrorUserName(false)
        }else{
            setErrorUserName(true)
        }
    }

    const changePasswordInput = (event) =>{
        setinvalidDataError(false)
        let { value } = event.target
        setPassword(value)
        setErrorPassword(false)
    }
    
    const validatePassword = () =>{
        if(REGEX.password.test(password)){
            setErrorPassword(false)
        }else{
            setErrorPassword(true)
        }
    }

    const onAuthenticate = (event) =>{
        event.preventDefault();
        if(userName !== '' && password !== '' && !errorUserName && !errorPassword ){
            if(USERNAME === userName && password === PASSWORD){
                let userData = { userName, password}
                dispatch(loggedIn(userData))
                props.history.push('/home')
            }else{
                setinvalidDataError(true)
                setTimeout(()=>{setinvalidDataError(false)},1000)
                setUserName('')
                setPassword('')
            }

        }else{
            validatePassword()
            validateUserName()
        }

    }


    return (
      <div className=" card container shadow-lg rounded" style={{width : '50%', marginTop:'15%' }}>
            <form className="mt-5 pd-5">
            {
                invalidDataError && 
                <div class="alert alert-danger alert-dismissible fade show">
                     Invalid username and password.
                    <button type="button" onClick={()=>setinvalidDataError(false)} class="close" data-dismiss="alert">&times;</button>
                </div>

            } 
            <TextInput
                label = "Username"
                type = "text"
                name = "userName"
                value = {userName}
                onChange = {changeUserNameInput}
                onBlur = {validateUserName}
                error = {errorUserName}
                errorMessage = "Invalid username"
                marginRight = "47%"
                labelStyle = "col-sm-2 col-form-label"
                inputStyle = "col-sm-10"
                placeholder = ''
                loginField = {true}
            />
            <TextInput
                label = "Password"
                type = "password"
                name = "password"
                value = {password}
                onChange = {changePasswordInput}
                onBlur = {validatePassword}
                error = {errorPassword}
                errorMessage = "Invalid password"
                marginRight = "47%"
                labelStyle = "col-sm-2 col-form-label"
                inputStyle = "col-sm-10"
                placeholder = ''
                loginField = {true}
            />
            <div className="form-group row">
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary shadow" onClick={onAuthenticate}>Sign in</button>
                </div>
            </div>
        </form>
      </div>
    );
}

export default Login;