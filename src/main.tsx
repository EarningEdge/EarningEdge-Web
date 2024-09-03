import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import router from "./routes/index.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./components/layout/error/ErrorBoundary.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let persister = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <RouterProvider router={router} />
          <ToastContainer/>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </ErrorBoundary>
);
