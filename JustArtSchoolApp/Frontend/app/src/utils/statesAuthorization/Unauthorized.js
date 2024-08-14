import {useNavigate} from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <div className="lock"></div>
            <div className="message">
                <h1>Access to this page is restricted</h1>
                <p>Please check with the site admin if you believe this is a mistake.</p>
            </div>

            <button className={"btn btn-danger"} onClick={goBack}>GO BACK</button>
        </section>
    )
}

export default Unauthorized