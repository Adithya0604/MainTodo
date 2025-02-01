import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import store from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
