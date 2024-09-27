import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Profile from "./pages/Profile";
import MyDetails from "./comps/Profile/MyDetails";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Profile Route */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Navigate to="my-details" replace />} />
          <Route path="my-details" element={<MyDetails />} />
        </Route>
      </Routes>
    </Layout>
  );
}
