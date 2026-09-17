import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { authApi, type AuthResponse } from "./authApi";

const STOREFRONT_URL = import.meta.env.VITE_STOREFRONT_URL ?? "http://localhost:5173";

function getRequestErrorMessage(requestError: unknown) {
  if (requestError && typeof requestError === "object" && "response" in requestError) {
    return String(
      (requestError as { response?: { data?: { message?: string } } }).response?.data?.message ??
      "Thông tin đăng nhập không hợp lệ.",
    );
  }

  return "Không thể kết nối máy chủ.";
}

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const isRegister = location.pathname === "/register" || params.get("mode") === "register";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isRegister && !acceptedTerms) {
      setError("Vui lòng đồng ý với điều khoản sử dụng để tiếp tục.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const response = isRegister
        ? await authApi.register({
          name: [firstName.trim(), lastName.trim()].filter(Boolean).join(" "),
          email: normalizedEmail,
          password,
        })
        : await authApi.login({ email: normalizedEmail, password });
      const data: AuthResponse = response.data.data;

      localStorage.setItem("fashion_admin_access_token", data.accessToken);
      localStorage.removeItem("fashion_admin_refresh_token");
      localStorage.setItem("fashion_admin_user", JSON.stringify(data.user));
      navigate("/dashboard", { replace: true });
    } catch (requestError: unknown) {
      setError(getRequestErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <div className="auth-frame">
        <section className="auth-visual" aria-label="Fashion Store introduction">
          <div className="auth-visual__grain" />
          <div className="auth-visual__dune auth-visual__dune--back" />
          <div className="auth-visual__dune auth-visual__dune--front" />

          <div className="auth-visual__topbar">
            <Link className="auth-brand" to="/login" aria-label="Fashion Store admin login">
              SHOP<span>.CO</span>
            </Link>
            <a className="auth-back-link" href={STOREFRONT_URL}>
              Back to website <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="auth-visual__caption">
            <p>Fashion Store Admin</p>
            <h1>
              Shape the store.
              <br />
              Move the future.
            </h1>
            <div className="auth-visual__steps" aria-hidden="true">
              <span />
              <span />
              <span className="is-active" />
            </div>
          </div>
        </section>

        <section className="auth-panel">
          <div className="auth-panel__content">
            <p className="auth-eyebrow">Admin Console</p>
            <h2>{isRegister ? "Create an account" : "Welcome back"}</h2>
            <p className="auth-switch-copy">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <Link to={isRegister ? "/login" : "/register"}>
                {isRegister ? "Log in" : "Sign up"}
              </Link>
            </p>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <form className="auth-form" onSubmit={submit}>
              {isRegister && (
                <div className="auth-form__row">
                  <label className="auth-field">
                    <span>First name</span>
                    <input
                      required
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="Fletcher"
                    />
                  </label>
                  <label className="auth-field">
                    <span>Last name</span>
                    <input
                      required
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="Last name"
                    />
                  </label>
                </div>
              )}

              <label className="auth-field">
                <span>Email</span>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              <label className="auth-field">
                <span>Password</span>
                <span className="auth-password-input">
                  <input
                    required
                    minLength={6}
                    type={showPassword ? "text" : "password"}
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    className="auth-password-toggle"
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                  </button>
                </span>
              </label>

              {isRegister && (
                <label className="auth-terms">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                  />
                  <span>
                    I agree to the <span className="auth-terms__link">Terms &amp; Conditions</span>
                  </span>
                </label>
              )}

              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? "Please wait…" : isRegister ? "Create account" : "Log in"}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>

            <div className="auth-divider" aria-hidden="true">
              <span />
              <em>Or continue with</em>
              <span />
            </div>

            <div className="auth-socials">
              <button className="auth-social" type="button" disabled title="Google sign-in is not configured yet">
                <span className="auth-social__google" aria-hidden="true">G</span>
                Google
              </button>
              <button className="auth-social" type="button" disabled title="Apple sign-in is not configured yet">
                <span className="auth-social__apple" aria-hidden="true">●</span>
                Apple
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
