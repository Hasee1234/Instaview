"use client"; // Ensures this file runs on the client side

import { Provider } from "react-redux";
import { store } from "../Store/Store";
export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
