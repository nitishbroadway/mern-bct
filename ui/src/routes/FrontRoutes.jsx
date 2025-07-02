import { Route, Routes } from "react-router-dom"
import { FrontLayout } from "../components/FrontLayout"
import { FrontHome } from "../pages/front/FrontHome"
import { Category } from "../pages/front/Category"
import { Article } from "../pages/front/Article"

export const FrontRoutes = () => {
    return <Routes>
        <Route path="/" element={<FrontLayout />}>
            <Route index element={<FrontHome />} />

            <Route path="/categories/:id" element={<Category />} />

            <Route path="/articles/:id" element={<Article />} />
        </Route>
    </Routes>
}