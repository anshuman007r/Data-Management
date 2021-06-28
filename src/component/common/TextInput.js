function TextInput(props){
    return(
        <>
            <div className="form-group row">
                <label htmlFor="inputEmail3" className= { props.labelStyle }>{props.label}</label>
                <div className= {props.inputStyle} >
                    <input autoComplete = "off" type={props.type} name={props.name} value={props.value} className= { props.loginField ? "form-control shadow" : "form-control"} id="inputEmail3" onChange={props.onChange} onBlur={props.onBlur} placeholder={props.placeholder}/>
                </div>
            </div>
            {
                props.error  &&
                <div className="text-danger text-center" style={{marginTop: -10, marginRight:props.marginRight, fontSize:'14px'}}>{props.errorMessage}</div>
            }  
        </>
    )
}

export default TextInput