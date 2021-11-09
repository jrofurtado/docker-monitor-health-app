import cx from "classnames";
import { useState } from "react";

import go_arrow from "@/media/go_arrow.svg";
import { ApplicationInterface } from "@/requests/api/types";

interface Props {
  item: ApplicationInterface;
}

export function Application({ item }: Props): JSX.Element {
  const [show, setShow] = useState<boolean>(false);

  return (
    <li className="min-w-full mx-auto rounded-md bg-indigo-500 p-3 text-white">
      <div className="text-4xl text-white font-extrabold flex items-center justify-center">
        <button onClick={() => setShow((state) => !state)}>{item.name}</button>
      </div>
      {show && (
        <table className="table-auto w-full mt-3">
          <thead>
            <tr>
              <th className="w-1/2">Server</th>
              <th className="w-1/4">Containers</th>
              <th className="w-1/4">Health</th>
              <th className="w-1/4"></th>
            </tr>
          </thead>
          <tbody>
            {item.servers.map((server, index) => (
              <tr key={index}>
                <td>{server.name}</td>
                <td>{server.status.containers}</td>
                <td
                  className={cx(
                    server.status.healthy ? "text-green-400" : "text-red-400"
                  )}
                >
                  {server.status.healthy ? "Healthy" : "Unhealthy"}
                </td>
                <td className="w-5 h-5">
                  <button className="w-5 h-5">
                    <img src={go_arrow} alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </li>
  );
}
