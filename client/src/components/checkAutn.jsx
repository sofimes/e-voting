import axios from "../utils/api";

const checkAuth = async (setUser, navigate) => {
  const clearAuthData = () => {
    // Clear user session
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("role");
    navigate("/login"); // Redirect to login
  };
  const token = sessionStorage.getItem("jwt");
  const storedRole = sessionStorage.getItem("role");
  console.log(token);
  if (!token || !storedRole) {
    clearAuthData();
    return;
  }
  try {
    const res = await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userId = res.data._id;
    const role = res.data.role; // Get user role
    sessionStorage.setItem("user", userId);
    sessionStorage.setItem("role", role);
    setUser(userId);
  } catch (error) {
    console.error("token validation failede", error);
    clearAuthData();
  }
};
export default checkAuth;
