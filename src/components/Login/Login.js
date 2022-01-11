import { useFormik } from "formik";
import Input from "../../common/Input";
import * as Yup from 'yup';
import "./login.css";
import { Link, withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from "../../services/loginService";
import { useAuthActions, useAuth } from "../../Providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

//1.
const initialValues = {
    email: "",
    password: "",
};

//3.
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .required("password is required"),
});


const Login = ({history}) => {
    const setAuth = useAuthActions();
    const auth = useAuth();
    const [error, setError] = useState(null);
    const query = useQuery();
    const redirect = query.get("redirect") || "/";

    useEffect(() => {
        if(auth) history.push(redirect);
    }, [redirect, auth]);

    //2.
    const onSubmit = async (values) => {
        // console.log(values);
        try {
           const {data} = await loginUser(values);
            setAuth(data);
            // localStorage.setItem("authState", JSON.stringify(data));
           setError(null);
           history.push(redirect);
        } catch (error) {
            console.log(error);
            if(error.response && error.response.data.message ) {
                setError(error.response.data.message);
            }
        }
    }; 

    const formik = useFormik({
        initialValues, 
        onSubmit, // equal key:value
        validationSchema,
        validateOnMount: true,
    });
    return (
        <div className="formContainer">
            <form onSubmit={formik.handleSubmit}>
                <Input formik={formik} name="email" label="Email"/>
                <Input formik={formik} name="password" label="Password" type="Password"/>
                <button type="submit" disabled={!formik.isValid} className="btn primary" style={{width:"100%"}}>
                    Login
                </button>
                { error && <p style={{color:"red"}}> {error}</p>}
                <Link to={`/signup?redirect=${redirect}`}>
                    <p style={{ marginTop: "15px" }}>Not signup yet ?</p>
                </Link>
            </form>
        </div>
    );
}
 
export default withRouter(Login);