import { createContext, useContext } from "react";

export const sidebarContext = createContext({ expanded: false });

export const useSideBarContext = () => useContext(sidebarContext);

export default sidebarContext.Provider;
