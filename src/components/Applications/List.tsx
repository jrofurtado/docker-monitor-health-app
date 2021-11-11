import { useEffect, useState } from "react";

import { Application } from "@/components/Applications/Application";
import Page from "@/components/Page";
import RequireAuth from "@/components/RequireAuth";
import { api } from "@/requests/api/api";
import { ApplicationInterface } from "@/requests/api/types";

export default function List() {
  const [applications, setApplications] = useState<ApplicationInterface[]>([]);

  useEffect(() => {
    api
      .getApplicationList()
      .then((response) => response && setApplications(response))
      .catch(() => {});
  }, []);

  return (
    <RequireAuth>
      <Page centerHor centerVer>
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
