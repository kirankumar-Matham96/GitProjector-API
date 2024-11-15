import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, signin, setUser } from "../../redux/authSlice";
import Card from "../../components/Card";
import styles from "./index.module.scss";

const Signin = () => {
  const email = useRef();
  const password = useRef();

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email.current.value,
      password: password.current.value,
    };

    dispatch(setUser(userData));
    dispatch(signin(userData));
  };

  useEffect(() => {
    if (!auth.isLoading) {
      email.current.value = "";
      password.current.value = "";
    }
  }, [auth.isLoading]);

  return (
    <div className={styles.bg_signin}>
      <Card>
        <form className={styles.signinForm} onSubmit={handleSubmit}>
          <h2>SIGN IN</h2>
          <Input
            ref={email}
            label="Email: "
            type="email"
            name="email"
            id="signinEmail"
            placeholder="Enter your email"
          />
          <Input
            ref={password}
            label="Password: "
            type="password"
            name="password"
            id="signinPassword"
            placeholder="Enter your password"
          />
          <Button type="submit">
            {auth.isLoading ? "Loading..." : "Sign In"}
          </Button>
          <p className="helper-link">
            <Link to="/signup">Don't have an account?</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Signin;