import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserLogin } from 'api/hooks/user/useUserLogin';
import Cookies from "js-cookie";
import { appRoutes } from "routes/appRoutes";
import { TOKEN_KEY } from "api/constants";
import { useAuth } from "context/AuthProvider";

export const Login: React.FC = () => {
  const { setLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string[]>([]);
  const { mutate } = useUserLogin();

  const handleSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate({ user: { email, password }}, {
          onSuccess: (res) => {
              Cookies.set(TOKEN_KEY, res.user.token);
              setLogin(!!Cookies.get(TOKEN_KEY));
              navigate(appRoutes.main);
          },
          onError: ({ errors }) => setError(errors.body),
        });
      },
      [mutate, navigate, email, password, setLogin]
  );
  return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <a href="">Have an account?</a>
              </p>

              {!!error.length && (<ul className="error-messages">
                    <li>{error}</li>
                  </ul>
              )}

              <form onSubmit={handleSubmit} action="multipart/form-data">
                <fieldset className="form-group">
                  <input
                      required
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                      required
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
