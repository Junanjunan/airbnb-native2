import { connect } from "react-redux";
import { getRooms } from "../../../redux/roomsSlice";
import ExploreContainer from "./ExploreContainer";

function mapDispatchToProps(dispath){
    return {
        getRooms: () => dispatch(getRooms())
    }
}

export default connect(null, mapDispatchToProps)(ExploreContainer);