import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
