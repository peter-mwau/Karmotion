import * as React from "react";

type TooltipContextType = Record<string, unknown>;

const TooltipContext = React.createContext<TooltipContextType | null>(null);

export const TooltipProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TooltipContext.Provider value={{}}>{children}</TooltipContext.Provider>
  );
};

export const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
