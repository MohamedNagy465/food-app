import { useContext, useState } from "react";
import { StoreContext } from "../../Context/StorContext";
import { Facebook, Globe } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginPopup({ setShowLogin }) {
  const { setUser } = useContext(StoreContext);
  const [isSignup, setIsSignup] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isReset) {
      // 🔹 إعادة تعيين كلمة المرور
      const existingUser = users.find((u) => u.email === email);
      if (!existingUser) {
        toast.error("❌ Email not found!");
        return;
      }

      existingUser.password = password;
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("✅ Password reset successfully!");
      setIsReset(false);
      setEmail("");
      setPassword("");
      return;
    }

    if (isSignup) {
      // 🔹 تسجيل حساب جديد
      const userExists = users.find((u) => u.email === email);
      if (userExists) {
        toast.error("⚠️ Email already registered!");
        return;
      }

      // 🧡 تحديد الدور: admin أو user
      const role = email === "admin@store.com" ? "admin" : "user";

      const newUser = { email, password, role, token: "signup-demo-token" };
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(newUser));

      setUser(newUser);
      toast.success("✅ Account created successfully!");
      setShowLogin(false);

      // 👑 لو أدمن -> dashboard
      if (role === "admin") navigate("/admin");
    } else {
      // 🔹 تسجيل الدخول
      const existingUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!existingUser) {
        toast.error("❌ Email or password incorrect!");
        return;
      }

      localStorage.setItem("user", JSON.stringify(existingUser));
      setUser(existingUser);
      toast.success("✅ Logged in successfully!");
      setShowLogin(false);

      // 👑 لو أدمن -> dashboard
      if (existingUser.role === "admin") navigate("/admin");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowLogin(false)}
    >
      <div
        className="bg-white rounded-xl p-8 w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* زر الغلق */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={() => setShowLogin(false)}
        >
          &times;
        </button>

        {/* العنوان */}
        <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">
          {isReset
            ? "Reset Password"
            : isSignup
            ? "Create Account"
            : "Sign In"}
        </h2>

        {/* الفورم */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {(!isReset || (isReset && email)) && (
            <input
              type="password"
              placeholder={isReset ? "Enter new password" : "Password"}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          <button
            type="submit"
            className="bg-orange-500 text-white rounded-md py-2 hover:bg-orange-600 transition"
          >
            {isReset
              ? "Reset Password"
              : isSignup
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        {/* روابط التسجيل / تسجيل الدخول */}
        {!isReset && (
          <p className="text-center text-gray-500 mt-2">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              className="text-orange-500 font-semibold hover:underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Sign In" : "Create Account"}
            </button>
          </p>
        )}

        {/* نسيت كلمة المرور */}
        {!isSignup && !isReset && (
          <p className="text-sm text-gray-500 mt-4 text-center">
            Forgot your password?{" "}
            <button
              className="text-orange-500 font-semibold hover:underline"
              onClick={() => {
                setIsReset(true);
                setEmail("");
                setPassword("");
              }}
            >
              Reset
            </button>
          </p>
        )}

        {/* العودة لتسجيل الدخول */}
        {isReset && (
          <p className="text-center text-gray-500 mt-3">
            Remembered your password?{" "}
            <button
              className="text-orange-500 font-semibold hover:underline"
              onClick={() => setIsReset(false)}
            >
              Back to Sign In
            </button>
          </p>
        )}

        {/* تسجيل الدخول عبر مواقع التواصل */}
        {!isReset && (
          <>
            <p className="text-center text-gray-500 my-3">Or sign in with</p>
            <div className="flex gap-4 justify-center">
              <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition">
                <Globe size={20} /> Google
              </button>
              <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-blue-600 hover:text-white transition">
                <Facebook size={20} /> Facebook
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPopup;
