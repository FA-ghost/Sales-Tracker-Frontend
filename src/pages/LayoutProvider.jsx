import React, { useState } from "react";

const LayoutCtx = React.createContext(null);

export function LayoutProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");
  const value = { collapsed, setCollapsed, theme, setTheme };
  return <LayoutCtx.Provider value={value}>{children}</LayoutCtx.Provider>;
}

export const useLayout = () => React.useContext(LayoutCtx);
