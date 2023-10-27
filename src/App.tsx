import "./App.css";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import store from "./reudux/store/store";
import Router from "./routers/router";

function App() {
  const paypalClientId =
    "AfzQrhUAkqZF6_SjCFpJlGci0Bvsl4vQ9PGjePxIx6MJ9xincEviv0xrjJpN-gRKDk2ZiiLR4VIR5tRR";
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <PayPalScriptProvider options={{ clientId: paypalClientId }}>
            <Router />
          </PayPalScriptProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
