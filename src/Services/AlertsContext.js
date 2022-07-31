import {createContext, useState} from "react";
import {AuthContext} from "./AuthContext";

export const AlertsContext = createContext([]);

export const AlertTypes = {
  Success: "alert-success",
  Danger: "alert-danger",
  Warning: "alert-warning",
  Info: "alert-info",
  Primary: "alert-primary",
  Secondary: "alert-secondary"
};

export function AlertsProvider({children, ...props})
{
    const [count, setCount] = useState(0);
    const [queue, setQueue] = useState([]);

    const addAlert = (message, type = AlertTypes.Primary, delay = -1) => {
        const id = count;
        setCount(count + 1);
        setQueue([{id ,message, type, delay}, ...queue]);
    };

    const removeAlert = (id) => setQueue(queue?.filter(x => x.id !== id));

    const clear = () => setQueue([]);

    const value = {
      addAlert,
      removeAlert,
      clear,
      queue
    };

    return <AlertsContext.Provider value={value} {...props}>
      {children}
    </AlertsContext.Provider>;
}