import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setupAxiosInterceptors from "./config/axios-interceptor.ts";

setupAxiosInterceptors(() => {});
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
