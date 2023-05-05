import { useSite } from "../context/SiteContext"
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'

export default function AlertWindow() {


    const { alert, setAlert } = useSite()
    let IsActive = alert[0].alertIsActive
    let ToastBG = alert[0].situation


    return (
        <>
            {IsActive ?
                <ToastContainer position='top-center' style={{ marginTop: "50px", textAlign: 'center' }}>
                    <Toast
                        bg={ToastBG}
                    
                        onClose={() => setAlert((prevAlert) => [{ ...prevAlert[0], alertIsActive: false },])}
                        show={IsActive} delay={3000} autohide
                    >

                        <Toast.Body>{alert[0].alertMessage}</Toast.Body>

                    </Toast>
                </ToastContainer>

                : ""
            }
        </>
    )
}
