import React, { useContext, createContext, useReducer } from "react";

interface iFiles {
  [fileName: string]: {
    emails: string[];
  };
}

/* ------------------------------------------- Reducer ------------------------------------------ */

interface iActionAdd {
  type: "add";
  fileName: string;
  emails: string[];
}

interface iActionRemove {
  type: "remove";
  fileName: string;
}

function reducer(state: iFiles, action: iActionAdd | iActionRemove) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        [action.fileName]: {
          emails: action.emails,
        },
      };
    case "remove":
      const stateCopy = { ...state };
      delete stateCopy[action.fileName];
      return stateCopy;
  }
}

/* ------------------------------------------- Context ------------------------------------------ */

const FilesContext = createContext<[iFiles, (args: iActionAdd | iActionRemove) => void]>([{}, _args => {}]);

export function FilesContextProvider({ children }: { children: React.ReactNode }) {
  const [files, dispatchFiles] = useReducer(reducer, {});
  return <FilesContext.Provider value={[files, dispatchFiles]}>{children}</FilesContext.Provider>;
}

export default function useFiles() {
  return useContext(FilesContext);
}
