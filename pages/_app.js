import "@/styles/globals.css";
import 'bootswatch/dist/Flatly/bootstrap.css';
import { SWRConfig } from 'swr';
import Layout from '../components/Layout';

const fetcher = async (url) => {
  const res = await fetch(url);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
