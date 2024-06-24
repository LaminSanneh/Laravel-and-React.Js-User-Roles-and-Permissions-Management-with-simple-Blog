import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const globalMessageMiddleware =
  () => (next: (arg0: unknown) => void) => (action) => {
    // if (action.error) {
      if (action.type.indexOf("rejected") !== -1) {
      debugger;
      console.error("Global Error Handler:", action.error.message);
      toast.error(action.error, {
        position: "top-right",
      });
      // Here you can dispatch a global error action, show a toast notification, log the error, etc.
    // } else if (action.statusMessage) {
    } else if (action.type.indexOf("fulfilled") !== -1) {
      debugger;
      toast.success(action.statusMessage, {
        position: "top-right",
      });
    }
    return next(action);
  };

export default globalMessageMiddleware;
