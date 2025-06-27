import { Navigate, Route, Routes } from "react-router-dom"
import { CmsLayout } from "../components/CmsLayout"
import { Home } from "../pages/cms/home/Home"
import { Login } from "../pages/cms/auth/Login"

export const CmsRoutes = () => {
    return <Routes>
        <Route path="/cms" element={<CmsLayout />}>
            <Route index element={<Home />} />

            <Route path="login" element={<Login />} />
        </Route>

        <Route path="/" element={<Navigate to="/cms" />} />
    </Routes>
}