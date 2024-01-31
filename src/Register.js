import React, { Fragment, useEffect, useRef, useState } from "react";
import classes from "./Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { createNewUser } from "./services/api";
import { Link } from "react-router-dom";

const NAME_REGEX = /^[A-Za-z]{2,24}(?:[-\s'][A-Za-z]+)*$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^(\+)?(?:[0-9] ?){6,14}[0-9]$/;
const ADDRESS_REGEX = /^[a-zA-Z0-9\s\.,#\-]+,\s*[a-zA-Z0-9\s\.,#\-]+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register';

function Register () {

    const errRef = useRef();


    const [success, setSuccess] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [address, setAddress] = useState("");
    const [validAddress, setValidAddress] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);

    const [user, setUser] = useState("");
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);
    

    useEffect( () => {
        setValidFirstName(NAME_REGEX.test(firstName))
    }, [firstName])

    useEffect( () => {
        setValidLastName(NAME_REGEX.test(lastName))
    }, [lastName])

    useEffect( () => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect( () => {
        setValidPhone(PHONE_REGEX.test(phone))
    }, [phone])

    useEffect( () => {
        setValidAddress(ADDRESS_REGEX.test(address))
    }, [address])

    useEffect( () => {
        setValidUser(USER_REGEX.test(user));

    }, [user])

    useEffect( () => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatchPwd(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect( () => {
        setErrMessage('');
    }, [firstName,lastName,email,phone,address,user,pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = NAME_REGEX.test(firstName);
        const v2 = NAME_REGEX.test(lastName);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = PHONE_REGEX.test(phone);
        const v5 = ADDRESS_REGEX.test(address);
        const v6 = USER_REGEX.test(user);
        const v7 = PWD_REGEX.test(pwd);
      
        if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7) {
            setErrMessage("Invalid Entry");
            return;
        }

        try{
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                username: user,
                password: pwd
            }
    
            const response = await createNewUser(newUser);
            setSuccess(true);
    
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setAddress("");
            setUser("");
            setPwd("");
            setMatchPwd("");
        }catch(err){
            if(!err.response){
                setErrMessage("No server response")
            }else if(err.response.status === 400){
                setErrMessage("Username already takan")
            }else{
                setErrMessage(err.message)
            }
        }

    }

    return(
        <Fragment>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to={"/login"}>Sign In</Link>
                    </p>
                </section>

            ) : (
                <section>
                    <p ref={errRef} className={errMessage ? classes.errmsg : classes.offscreen}>{errMessage}</p>
                    <h1>Registration</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstname">
                            First name:
                            <FontAwesomeIcon icon={faCheck} className={validFirstName ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? classes.hide : classes.invalid} />
                        </label>
                        <input
                        type="text"
                        id="firstname"
                        value={firstName}
                        required
                        onChange={ (e) => { setFirstName(e.target.value)}}
                        onFocus={ () => {setFirstNameFocus(true)}}
                        onBlur={ () => {setFirstNameFocus(false)}}
                        />
                        <p id="uidnote" className={firstNameFocus && firstName && !validFirstName ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Only letters allowed.<br /> 
                        </p>
                        <label htmlFor="lastname">
                            Last name:
                            <FontAwesomeIcon icon={faCheck} className={validLastName ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={!lastName || validLastName ? classes.hide : classes.invalid}/>
                        </label>
                        <input
                        type="text"
                        id="lastname"
                        value={lastName}
                        required
                        onChange={ (e) => { setLastName(e.target.value)}}
                        onFocus={ () => {setLastNameFocus(true)}}
                        onBlur={ () => {setLastNameFocus(false)}}
                        />
                        <p id="uidnote" className={lastNameFocus && lastName && !validLastName ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Only letters allowed.<br /> 
                        </p>
                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={!email || validEmail ? classes.hide : classes.invalid}/>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            required
                            onChange={ (e) => { setEmail(e.target.value)}}
                            onFocus={ () => {setEmailFocus(true)}}
                            onBlur={ () => {setEmailFocus(false)}}
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Allowed letters and numbers,<br />
                            Dot as a separator.<br /> 
                            Underscore, percent, plus, and hyphen are allowed.<br />
                        </p>
                        <label htmlFor="phone">
                            Phone number:
                            <FontAwesomeIcon icon={faCheck} className={validPhone ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={!phone || validPhone ? classes.hide : classes.invalid}/>
                        </label>
                        <input
                            type="phone"
                            id="phone"
                            value={phone}
                            required
                            onChange={ (e) => { setPhone(e.target.value)}}
                            onFocus={ () => {setPhoneFocus(true)}}
                            onBlur={ () => {setPhoneFocus(false)}}
                        />
                        <p id="uidnote" className={phoneFocus && phone && !validPhone ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Allowed plus Sign,<br />
                            Digits 0 - 9, spaces,hyphen<br /> 
                        </p>
                        <label htmlFor="address">
                            Address-city&country:
                            <FontAwesomeIcon icon={faCheck} className={validAddress ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={!address || validAddress ? classes.hide : classes.invalid}/>
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            required
                            onChange={ (e) => { setAddress(e.target.value)}}
                            onFocus={ () => {setAddressFocus(true)}}
                            onBlur={ () => {setAddressFocus(false)}}
                        />
                        <p id="uidnote" className={addressFocus && address && !validAddress ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Allowed letters and numbers,spaces<br />
                            commas, periods, hash symbols, and hyphens<br /> 
                        </p>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validUser ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={!user || validUser ? classes.hide : classes.invalid}/>       
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={user}
                            required
                            onChange={ (e) => { setUser(e.target.value)}}
                            onFocus={ () => {setUserFocus(true)}}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validUser ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? classes.valid : classes.hide}/>
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? classes.hide : classes.invalid}/>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={pwd}
                            required
                            onChange={ (e) => { setPwd(e.target.value)}}
                            onFocus={ () => {setPwdFocus(true)}}
                            onBlur={ () => {setPwdFocus(false)}}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span>!</span> <span aria-label="at symbol">@</span> <span>#</span> <span>$</span> <span>%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm password:
                            <FontAwesomeIcon icon={faCheck} className={validMatchPwd && matchPwd ? classes.valid : classes.hide}/>
                            <FontAwesomeIcon icon={faTimes} className={validMatchPwd || !matchPwd ? classes.hide : classes.invalid}/>

                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            value={matchPwd}
                            required
                            onChange={ (e) => { setMatchPwd(e.target.value)}}
                            onFocus={ () => {setMatchPwdFocus(true)}}
                            onBlur={ () => {setMatchPwdFocus(false)}}
                        />
                        <p id="confirmnote" className={matchPwdFocus && !validMatchPwd ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        <button type="submit" disabled=
                                                {!validFirstName ||
                                                !validLastName ||
                                                !validEmail ||
                                                !validPhone ||
                                                !validPhone ||
                                                !validUser ||
                                                !validPwd ||
                                                !validMatchPwd ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className={classes.line}>
                            <Link to={"/login"}>Sign In</Link>
                        </span>
                    </p>
                </section>

            )}

        </Fragment>
    )

}

export default Register;