import { React } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getuserreport } from "../../redux/api/user";
import { useSelector } from "react-redux";

function ReportModal(props) {
  const dispatch = useDispatch();
  const report=useSelector(state=>state.report.report);
  const {avg_speed, distance_per_week}=report;
  useEffect(() => {
    if (props.id !== 0) dispatch(getuserreport(props.id));
  }, [dispatch, props.id]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{fontFamily:'Arial, Helvetica, sans-serif'}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Record Report
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h4>Name: {props.name}</h4>
      <div>
        <span>
          Avg. Speed: {avg_speed}
        </span>{' '}
        <span style={{paddingLeft: '10em'}}>
          Distance/Week: {distance_per_week}
        </span>
      </div>
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReportModal;

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }
