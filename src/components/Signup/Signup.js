import { useFormik } from "formik";
import Input from "../../common/Input";
import * as Yup from 'yup';
import './signup.css';
import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../services/signUpService";
import { useAuth, useAuthActions } from "../../Providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react/cjs/react.development";

//1.
const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm:"",
};


//3.
const validationSchema = Yup.object({
    name:Yup.string()
        .required("name is required")
        .min(3, "Name length is not valid"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    phoneNumber: Yup.string()
        .required("phone Number is required")
        .matches(/^[0-9]{11}/, "Invalid phonenumber")
        .nullable(),
    password: Yup.string().required("password is required"),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // )
    passwordConfirm: Yup.string()
        .required("password Confirmation is required")
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})


const Signup = ({history}) => {
    const query = useQuery();
    const redirect = query.get("redirect") || "/";
    const setAuth = useAuthActions();
    const auth = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        if(auth) history.push(redirect);
    }, [redirect, auth]);

    //2
    const onSubmit = async (values) => {
        const {name, email, phoneNumber, password} = values;
        const userData = {
            name,   //equal key:value
            email, 
            phoneNumber, 
            password,
        };
        try {
            const {data} = await signupUser(userData);
            setAuth(data);
            // localStorage.setItem("authState", JSON.stringify(data));
            setError(null);
            // history.push("/");
            history.push(redirect);
        } catch (error) {
            // console.log(error.response);
            if(error.response || error.response.data.message ) {
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
                <Input formik={formik} name="name" label="Name"/>
                <Input formik={formik} name="email" label="Email"/>
                <Input formik={formik} name="phoneNumber" label="Phone Number" type="tel"/>
                <Input formik={formik} name="password" label="Password" type="Password"/>
                <Input formik={formik} name="passwordConfirm" label="Password Confirmation" type="Password"/>

                <button type="submit" disabled={!formik.isValid} className="btn primary" style={{width:"100%"}}>
                    Signup
                </button>
                { error && <p style={{color:"red"}}> {error}</p>}
                <Link to={`/login?redirect=${redirect}`} >
                    <p style={{marginTop:"15px"}}> Already Login?</p>
                </Link>
            </form>
        </div>
    );
}
export default withRouter(Signup);