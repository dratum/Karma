import ReactDOM from "react-dom/client";
import { createContext } from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store/store.ts";
import AuthStore from "./auth.store/auth.store.ts";
import App from "./app/App.tsx";

interface AuthState {
  authStore: AuthStore;
}

const authStore = new AuthStore();

export const AuthContext = createContext<AuthState>({
  authStore,
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <AuthContext.Provider value={{ authStore }}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AuthContext.Provider>
);
