import LoginForm from "../components/Form";

const AdminLogin = () => {
  const handleLogin = (username, password) => {
    console.log("Username:", username);
    console.log("Password:", password);
  }

  return (
    <div className=""> 
        <LoginForm onLogin={handleLogin} />
    </div>
  )
}

export default AdminLogin;
