import { Modal, Button } from 'react-bootstrap'

function PreviewModal(props){
    let arrayStockCategory = props.stockData.map((item)=>item.stockCategory)
    let indexOfPreview = arrayStockCategory.indexOf(props.previewStock.stockCategory)
    return(
        <Modal show={props.viewStockPopup} onHide={()=>props.setViewStockPopup(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Stock detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div class="form-group row ">
                    <label htmlFor="stockCategory" class="col-8 col-form-label" >Stock Category</label>
                    <div class="col-4 mt-2">
                        <strong>{props.previewStock.stockCategory}</strong>
                    </div>
                </div>
                <div class="form-group row ">
                    <label for="availableItem" class="col-8 col-form-label" >Available Item</label>
                    <div class="col-4 mt-2">
                        <strong>{props.previewStock.availableItem}</strong>
                    </div>
                </div>
                {
                    props.errorAvailableItem  &&
                    <div className="text-danger text-center" style={{marginTop:-10, marginRight:'1.2%', fontSize:'14px'}}> Invalid available item</div>
                }
                <div class="form-group row">
                    <label for="cost" class="col-8 col-form-label">Cost</label>
                    <div class="col-4 mt-2">
                        <strong>{props.previewStock.cost}</strong>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant = { indexOfPreview === 0 ? "secondary" :  "info"} onClick={props.prevStock}>
                    Prev
                </Button>
                <Button variant= {indexOfPreview === props.stockData.length-1 ? "secondary" :  "primary"} onClick={props.nextStock}>
                    Next
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PreviewModal