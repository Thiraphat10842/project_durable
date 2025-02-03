import { Suspense } from 'react'
import './App.css'
import { ConfigProvider, Spin } from "antd";
import thTH from "antd/locale/th_TH";
import Main from './Pages/Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Suspense fallback={<Spin className="px-[50%] py-[20%]" />}>
        <ConfigProvider
          locale={thTH}
          theme={{
            token: {
              fontFamily: `'Noto Sans Thai', sans-serif, Kanit`,
            },
          }}
        >
          <ToastContainer />
          <Main />

        </ConfigProvider>
      </Suspense>

    </>
  )
}

export default App
