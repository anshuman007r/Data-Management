// import logout from '../assets/logout.png'
import Delete from '../assets/deleteIcon.png'
import Edit from '../assets/editIcon.png'
import Preview from '../assets/previewIcon.png'
import logout from '../assets/logout.png'
import { loggedOut, addStock } from '../redux/action'
import add from '../assets/add.png'
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { REGEX } from '../utils/WebUtil'
import { useSelector, useDispatch } from 'react-redux' 

function HomePage(props) {
        const dispatch = useDispatch()
        let [show,toggleModal] = useState(false) 
        let [ stockCategory, setStockCategory ] = useState('')
        let [ errorStockCategory, setErrorStockCategory ] = useState(false)
        let [ availableItem, setAvailableItem ] = useState('')
        let [ errorAvailableItem, setErrorAvailableItem ] = useState(false)
        let [ cost, setCost ] = useState('')
        let [ errorCost, setErrorCost ] = useState(false)
        let stockData = useSelector(state => state.reducer.stockData? state.reducer.stockData : [])
        let [ deletePopup, setDeletePopup] = useState(false)
        let [ stockToDelete, setStockToDelete ] = useState('')

        const onLogoutClick = () =>{
            dispatch(loggedOut())
        }

        const showModal = () =>{
            toggleModal(true)
        }

        const changeStockCategoryInput = (event) =>{
            setErrorStockCategory(false)
            let { value } = event.target
            console.log(value)
            setStockCategory(value)
        }

        const validateStockCategory = () =>{
            console.log(stockCategory,REGEX.alpha)
            if(REGEX.alpha.test(stockCategory)){
                setErrorStockCategory(false)
            }else{
                setErrorStockCategory(true)
            }
        }

        const changeAvailableItemInput = (event) =>{
            setErrorAvailableItem(false)
            let { value } = event.target
            setAvailableItem(value)
        }
        
        const validateAvailableItem = () =>{
            if(REGEX.number.test(availableItem)){
                setErrorAvailableItem(false)
            }else{
                setErrorAvailableItem(true)
            }
        }
    
        const changeCostInput = (event) =>{
            setErrorCost(false)
            let { value } = event.target
            setCost(value)
        }
        
        const validateCost = () =>{
            if(REGEX.number.test(cost)){
                setErrorCost(false)
            }else{
                setErrorCost(true)
            }
        }

        const closeModal = () =>{
            toggleModal(false)
            setErrorCost(false)
            setErrorAvailableItem(false)
            setErrorStockCategory(false)
        }

        const openDeleteModal = (stockToDelete) =>{
            setDeletePopup(true)
            setStockToDelete(stockToDelete)
        }

        const onAddStock = (event) =>{
            event.preventDefault()
            if(stockCategory !== '' && !errorStockCategory && cost !== '' && !errorCost && availableItem !== '' && !errorAvailableItem){
                let stockItem = { stockCategory, availableItem, cost}
                stockData.push(stockItem)
                dispatch(addStock(stockData))
                setStockCategory('')
                setAvailableItem('')
                setCost('')
                toggleModal(false)
            }else{
                validateCost()
                validateStockCategory()
                validateAvailableItem()
            }
        }

        const cancelDeleteOfStock = () =>{
            setStockToDelete('')
            setDeletePopup(false)
        }
        
        const deleteStockFromStockData = () =>{
            let filterStockData = stockData.filter((item)=> item.stockCategory !== stockToDelete)
            dispatch(addStock(filterStockData))
            setDeletePopup(false)
        }

        return (
            <div style={{height:'100%'}}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow flex-row-reverse">
                    <img src={logout} className="rounded-circle" onClick={onLogoutClick} style={{height:'30px', width : '35px'}} alt="logout"/>
                    <h2 className="text-center col-sm-11 m-auto text-monospace text-light   ">Stock Detail</h2>
                </nav>
                <section className= 'w-100 h-50 mx-auto' style={{ paddingLeft:'18%', paddingTop:'10%' }}>
                    <img src={add} onClick={showModal} className="mb-2 rounded-circle" style={{width:30, height:30, marginLeft:'72%'}} alt='add buton' />
                    <table className="table w-75 shadow ">
                        <thead className="thead-dark shadow">
                            <tr className="shadow">
                            <th scope="col">Sl no.</th>
                            <th scope="col">Stock Category</th>
                            <th scope="col">Available Item</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                stockData.map((item,index)=>(
                                    <tr className="shadow">
                                        <th scope="row">{index+1}</th>
                                        <td>{item.stockCategory}</td>
                                        <td>{item.availableItem}</td>
                                        <td>{item.cost}</td>
                                        <td className='row justify-content-around w-75' style={{marginLeft:-10}}>
                                            <img src={Preview}  style={{width:14 , height:14}} alt="action_preview"/>
                                            <img src={Edit} style={{width:14 , height:14}} alt="action_edit"/>
                                            <img src={Delete}      onClick={()=>openDeleteModal(item.stockCategory)} style={{width:14 , height:14}} alt="action_delete"/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>
                <Modal show={show}>
                    <Modal.Header closeButton onClick={closeModal}>
                    <Modal.Title>Add new stock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form className="font-weight-bold">
                        <div class="form-group row ">
                            <label htmlFor="stockCategory" class="col-4 col-form-label" >Stock Category</label>
                            <div class="col-8">
                                <input type="text" name='stockCategory' value={stockCategory} class="form-control" id="stockCategory" onChange={changeStockCategoryInput} onBlur={validateStockCategory} placeholder="Enter stock category"/>
                            </div>
                        </div>
                        {
                            errorStockCategory  &&
                            <div className="text-danger text-center" style={{marginTop:-10, marginRight:'0.8%', fontSize:'14px'}}> Invalid stock category</div>
                        }
                        <div class="form-group row ">
                            <label for="availableItem" class="col-4 col-form-label" >Available Item</label>
                            <div class="col-8">
                                <input type="text" name='availableItem' value={availableItem} class="form-control" id="availableItem" onChange={changeAvailableItemInput} onBlur={validateAvailableItem} placeholder="Enter the number of available item"/>
                            </div>
                        </div>
                        {
                            errorAvailableItem  &&
                            <div className="text-danger text-center" style={{marginTop:-10, marginRight:'1.2%', fontSize:'14px'}}> Invalid available item</div>
                        }
                        <div class="form-group row">
                            <label for="cost" class="col-4 col-form-label">Cost</label>
                            <div class="col-8">
                                <input type="text" name='cost' value={cost} class="form-control" id="cost" onChange={changeCostInput} onBlur={validateCost} placeholder="Enter the cost of each item"/>
                            </div>
                        </div>
                        {
                            errorCost  &&
                            <div className="text-danger text-center" style={{marginTop:-10, marginRight:'13%', fontSize:'14px'}}> Invalid Cost</div>
                        }
                        <button type="submit" class="btn btn-primary" onClick={onAddStock}>Add</button>
                    </form>
                    </Modal.Body>
                </Modal>
                <Modal show={deletePopup} onHide={()=>setDeletePopup(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Are you sure want to delete <strong>{stockToDelete}</strong> ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="primary" onClick={deleteStockFromStockData}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={cancelDeleteOfStock}>
                        No
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
}

export default HomePage;