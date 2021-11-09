import cx from "classnames";

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
    <div className="bg-blue-300">
      <div
        className={cx(
          "container w-screen mx-auto min-h-screen flex",
          centerHor && "justify-center",
          centerVer && "items-center"
        )}
      >
        {children}
      </div>
    </div>
  );
}
