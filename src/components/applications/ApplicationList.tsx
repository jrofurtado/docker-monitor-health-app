import { useEffect, useState } from "react";

import { Application } from "@/components/applications/Application";
import Page from "@/components/Page";
import RequireAuth from "@/components/RequireAuth";
import { api } from "@/requests/api/api";
import { ApplicationInterface } from "@/requests/api/types";

export default function ApplicationList(): JSX.Element {
  const [applications, setApplications] = useState<ApplicationInterface[]>([]);

  // TODO: Switch to swr
  useEffect(() => {
    api
      .getApplicationList()
      .then((response) => response && setApplications(response))
      .catch(() => {});
  }, []);

  return (
    <RequireAuth>
      <Page centerHor>
        <div>
          <ul className="min-w-[450px]">
            {applications.map((item, index) => (
              <Application key={index} item={item} />
            ))}
          </ul>
        </div>
      </Page>
    </RequireAuth>
  );
}
