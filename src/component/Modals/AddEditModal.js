import { Modal } from 'react-bootstrap'
import TextInput from '../common/TextInput'

function AddEditModal(props){
    return(
        <Modal show={props.show}>
            <Modal.Header closeButton onClick={props.closeModal}>
                <Modal.Title>{Object.keys(props.stockToEdit).length > 0 ? 'Edit' : 'Add new'} stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form className="font-weight-bold">
                <TextInput
                    label = "Stock Category"
                    type = "text"
                    name = "stockcategory"
                    value = {props.stockCategory}
                    onChange = {props.changeStockCategoryInput}
                    onBlur = {props.validateStockCategory}
                    error = {props.errorStockCategory}
                    errorMessage = "Invalid stock category"
                    marginRight = "0.8%"
                    labelStyle = "col-4 col-form-label"
                    inputStyle = "col-8"
                    placeholder="Enter stock category"
                    loginField={false}
                />
                <TextInput
                    label = "Available Item"
                    type = "text"
                    name = "availableItem"
                    value = {props.availableItem}
                    onChange = {props.changeAvailableItemInput}
                    onBlur = {props.validateAvailableItem}
                    error = {props.errorAvailableItem}
                    errorMessage = "Invalid available item"
                    marginRight = '1.2%'
                    labelStyle = "col-4 col-form-label"
                    inputStyle = "col-8"
                    placeholder="Enter the number of available item"
                    loginField={false}
                />
                <TextInput
                    label = "Cost"
                    type = "text"
                    name = "cost"
                    value = {props.cost}
                    onChange = {props.changeCostInput}
                    onBlur = {props.validateCost}
                    error = {props.errorCost}
                    errorMessage = "Invalid cost"
                    marginRight = '13%'
                    labelStyle = "col-4 col-form-label"
                    inputStyle = "col-8"
                    placeholder="Enter the cost of each item"
                    loginField={false}
                />
                <button type="submit" className="btn btn-primary" onClick={props.onAddStock}>{Object.keys(props.stockToEdit).length >  0 ? 'Edit' : 'Add' }</button>
            </form>
            </Modal.Body>
        </Modal>
    )
}

export default AddEditModal