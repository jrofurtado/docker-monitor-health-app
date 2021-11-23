import { useState } from "react";
import { useNavigate } from "react-router";

import Container from "@/components/Container";
import Page from "@/components/Page";
import { authentication } from "@/requests/authentication/authentication";
import ROUTES from "@/resources/ROUTES";

export default function Login(): JSX.Element {
  // Router
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async () => {
    setLoading(true);
    const response = await authentication.getAuth(username, password, () =>
      navigate(ROUTES.LOGIN)
    );
    setLoading(false);
    if (response.success) navigate(ROUTES.APPLICATIONS);
  };

  return (
    <Page centerHor centerVer>
      <Container centerHor>
        <div className="">
          <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="**********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex mx-auto justify-center items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => !loading && onLogin()}
                >
                  {!loading ? "Sign In" : "Signing In ..."}
                </button>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2021 Globaleda. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </Page>
  );
}
