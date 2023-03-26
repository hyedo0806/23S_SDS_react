import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const id = searchParams.get('id');
    const mode = searchParams.get('mode');
 
    return (
        <div>
            <h1> Edit </h1>
            <p> 이곳은 수정 폼 </p>
            <button onClick={() => setSearchParams({who:"winterlood"})}> 바꾸기 </button>
            <button onClick={() => { navigate("/home")}}> home으로 가기 </button>

        </div>
    );
};

export default Edit;