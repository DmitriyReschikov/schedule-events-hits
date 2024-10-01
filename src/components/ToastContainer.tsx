import { ToastContainer as ToastC } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export const ToastContainer = () => {
    return (
        <ToastC
            position="bottom-right"
            autoClose={5000} />
    )
}