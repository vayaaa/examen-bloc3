import { useNavigate } from "react-router-dom";

const Drawer = ({ selectedResto }) => {

    const navigate = useNavigate();
   
    const changePage = () => {
        navigate(`/Command`);
    } 

     

    return (
        <div className="drawer-container">
            {selectedResto ? (
                <div className="drawer-infos">
                    <h4>Restaurant séléctionné</h4>
                    <p>{selectedResto.display_name}</p>
                    <button type="button" onClick={changePage}>Continuer</button>
                </div>
            ) : (<h4>Aucun restaurant séléctionné</h4>)
            }
        </div>
    )
}

export default Drawer