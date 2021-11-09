import cx from "classnames";

import { Header } from "@/components/Header";

interface Props {
  centerHor?: boolean;
  centerVer?: boolean;
  children: React.ReactNode;
}

export default function Page({
  centerHor,
  centerVer,
  children,
}: Props): JSX.Element {
  return (
    <div className="bg-blue-300 relative">
      <Header />
      <div
        className={cx(
          "container mx-auto flex min-h-screen w-screen",
          centerHor && "justify-center",
          centerVer && "items-center"
        )}
      >
        {children}
      </div>
    </div>
  );
}
