import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import axios from "axios";
import App from "./App";
import createAppStore from "./redux/store";
import {
    persistStore,
} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';
import PropTypes from "prop-types";
import PulseLoading from "./components/PulseLoading";
import FallbackLoading from "./components/FallbackLoading";



const ErrorComponent = ({ errorMessage, server }) => (
    <div> {(server ? <PulseLoading /> : errorMessage)}</div>
);

ErrorComponent.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  server: PropTypes.bool,
}

const AppContainer = () => {
    const [store, setStore] = useState(null);
    const [server, setServer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
      const checkServerStatus = async () => {
        try {
          await axios({
            method: 'get',
            url: `/api/server-status`,
            timeout: 5000,
            signal: AbortSignal.timeout(5000) //Aborts request after 5 seconds
          });
        } catch (err) {
          setServer(true);
          setError('Server Error');
        } finally {
          setLoading(false);
        }
      };
  
      checkServerStatus();
    }, []);
  
    // Asynchronously initialize the Redux store, including data fetching and authentication,
    // while displaying a loading indicator. Making sure that the store is initialized with credentials and data before rendering the app.
  
    useEffect(() => {
      const initializeStore = async () => {
        try {
          const appStore = await createAppStore();
          setStore(appStore);
        } catch (err) {
          setError(`Error initializing the app: ${err.message}`);
        }
      };
  
      initializeStore();
    }, []);
  
    if (loading || error || server) {
      return (
        <div className="flex items-center justify-center h-screen">
          {loading ? <FallbackLoading /> : <ErrorComponent errorMessage={error} server={server}/>}
        </div>
      );
    }
  
    return (
        <Provider store={store}>
            <PersistGate loading = {null} persistor={persistStore(store)}>
                <App />
            </PersistGate>
        </Provider>
    );
};
  
  export default AppContainer;