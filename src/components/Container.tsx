import cx from "classnames";

interface Props {
  centerHor?: boolean;
  centerVer?: boolean;
  children: React.ReactNode;
}

export default function Container({ centerHor, centerVer, children }: Props) {
  return (
    <div
      className={cx(
        "flex h-[max-content]",
        centerHor && "justify-center",
        centerVer && "align-center"
      )}
    >
      {children}
    </div>
  );
}
