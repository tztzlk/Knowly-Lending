import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-content-mobile px-4 sm:max-w-xl sm:px-5 md:max-w-2xl md:px-6 lg:max-w-4xl lg:px-8 xl:max-w-6xl 2xl:max-w-7xl ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
