import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "./components/Firebase";
import liff from "@line/liff";
import { Spinner } from "react-bootstrap";
import DefaultPage from "./components/Default";
import FormRegistrationPage from "./components/FormRegistration";
import FormCleaningHourlyPage from "./components/FormCleaningHourly";
import FormCleaningMonthlyPage from "./components/FormCleaningMonthly";
import FormSprayPage from "./components/FormSpray";
import FormBigCleaningPage from "./components/FormBigCleaning";
import FormVentPage from "./components/FormVent";
import "./App.css";

const liffId = ""; // Add your LIFF ID here.

const currentUrl = window.location.href;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      setLoading(true);

      liff
        .init({
          liffId: liffId,
        })
        .then(() => {
          if (liff.isLoggedIn()) {
            setUserId(liff.getDecodedIDToken().sub);
          } else {
            liff.login();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const validateUser = async () => {
      setLoading(true);

      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          userId === data.id ? setVerifiedUser(true) : setVerifiedUser(false);
        } else {
          setVerifiedUser(false);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    getUserId();
    validateUser();
  }, [userId]);

  return (
    <div className="App">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            style={{ width: "4rem", height: "4rem", borderWidth: "0.5em" }}
          >
            <span className="visually-hidden">กำลังโหลด...</span>
          </Spinner>
        </div>
      ) : verifiedUser ? (
        <Routes>
          <Route
            path="*"
            element={<DefaultPage headingText="Page Not Found." />}
          />
          <Route path="/" element={<DefaultPage headingText="Best care" />} />
          <Route
            path="/cleaning-hourly"
            element={<FormCleaningHourlyPage userId={userId} />}
          />
          <Route
            path="/cleaning-monthly"
            element={<FormCleaningMonthlyPage userId={userId} />}
          />
          <Route path="/spray" element={<FormSprayPage userId={userId} />} />
          <Route
            path="/big-cleaning"
            element={<FormBigCleaningPage userId={userId} />}
          />
          <Route path="/vent" element={<FormVentPage userId={userId} />} />
        </Routes>
      ) : (
        <FormRegistrationPage userId={userId} />
      )}
    </div>
  );
};

export default App;
