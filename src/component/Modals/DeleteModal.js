import { Modal, Button } from 'react-bootstrap'

function DeleteModal(props){
    return(
    <Modal show={props.deletePopup} onHide={()=>props.setDeletePopup(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure want to delete <strong>{props.stockToDelete}</strong> ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
            <Button variant="primary" onClick={props.deleteStockFromStockData}>
                Yes
            </Button>
            <Button variant="secondary" onClick={props.cancelDeleteOfStock}>
                No
            </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default DeleteModal