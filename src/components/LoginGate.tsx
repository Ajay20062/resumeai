import { useState, type FormEvent } from "react";

type LoginGateProps = {
  onLogin: () => void;
};

const defaultUsername = import.meta.env.VITE_APP_USERNAME ?? "admin";
const defaultPassword = import.meta.env.VITE_APP_PASSWORD ?? "123456";

export function LoginGate({ onLogin }: LoginGateProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      username.trim() === defaultUsername.trim() &&
      password.trim() === defaultPassword.trim()
    ) {
      localStorage.setItem("resumeai-auth", "ok");
      onLogin();
      return;
    }
    setError("Invalid credentials. Use the evaluator credentials provided.");
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={submit}>
        <h1>ResumeAI Agent Login</h1>
        <p className="auth-subtitle">
          Sign in to access the recruiter screening dashboard.
        </p>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="admin"
            autoComplete="username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="123456"
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="auth-error">{error}</p> : null}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
