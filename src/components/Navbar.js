import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <button onClick={() => navigate("/members")}>Members</button>
      <button onClick={logout} style={{ float: "right" }}>Logout</button>
    </div>
  );
}
