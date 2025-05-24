import type {  FC } from "react"
import useUser from "../../service/user"
import Loader from "../loader";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../header";

interface Props {
    allowedRoles?: string[];
}

const Protected: FC<Props> = ({allowedRoles}) => {
 // oturum açık olan kullanıcısnın verileri al
 const { user,isLoading} = useUser();

 // kullanıcı verileri yüklerken loader dönder
 if (isLoading) return <Loader/>;

 //eger rolü yetersizse login sayfasına yönlendir
 if (allowedRoles && !allowedRoles?.includes(user?.role))
    return <Navigate to="/login" replace/>;

 // kullanıcı oturumu açıksa sayfa içeriğini göster
 if (user) 
    return (
<div>
    <Header/>
        <Outlet/>
</div>
    );

 // kullanıcı oturumu kapalıysa login sayfasına yönlendir
 return <Navigate to="/login" replace />;

};

export default Protected
