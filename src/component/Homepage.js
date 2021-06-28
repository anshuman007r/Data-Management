import logout from '../assets/logout.png'
import { loggedOut, setStock } from '../redux/action'
import add from '../assets/add.png'
import { useState } from 'react'
import { REGEX } from '../utils/WebUtil'
import { useSelector, useDispatch } from 'react-redux' 
import Table from  './Table'
import DeleteModal from './Modals/DeleteModal'
import PreviewModal from './Modals/PreviewModal'
import AddEditModal from './Modals/AddEditModal'

function HomePage(props) {
        const dispatch = useDispatch()
        const [show,toggleModal] = useState(false) 
        const [ stockCategory, setStockCategory ] = useState('')
        const [ errorStockCategory, setErrorStockCategory ] = useState(false)
        const [ availableItem, setAvailableItem ] = useState('')
        const [ errorAvailableItem, setErrorAvailableItem ] = useState(false)
        const [ cost, setCost ] = useState('')
        const [ errorCost, setErrorCost ] = useState(false)
        const stockData = useSelector(state => state.reducer.stockData? state.reducer.stockData.sort((prev, curr)=> prev.stockCategory[0]-curr.stockCategory[0]) : [])
        const [ deletePopup, setDeletePopup] = useState(false)
        const [ stockToDelete, setStockToDelete ] = useState('')
        const [ viewStockPopup, setViewStockPopup ] = useState(false)
        const [ previewStock, setPreviewStock ] = useState({})
        const [ stockToEdit, setStockToEdit ] = useState({})

        const onLogoutClick = () =>{
            dispatch(loggedOut())
        }

        const showModal = (editStock = {}) =>{
            toggleModal(true)
            if(Object.keys(editStock).length > 0){
                setStockCategory(editStock.stockCategory)
                setAvailableItem(editStock.availableItem)
                setCost(editStock.cost)
                setStockToEdit(editStock)
            }
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

        const openPreview = (previewStock) =>{
            setPreviewStock(previewStock)
            setViewStockPopup(true)
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
            setStockToEdit({})
            toggleModal(false)
            setErrorCost(false)
            setErrorAvailableItem(false)
            setErrorStockCategory(false)
            setStockCategory('')
            setAvailableItem('')
            setCost('')
        }

        const openDeleteModal = (stockToDelete) =>{
            setDeletePopup(true)
            setStockToDelete(stockToDelete)
        }

        const onAddStock = (event) =>{
            event.preventDefault()
            if(stockCategory !== '' && !errorStockCategory && cost !== '' && !errorCost && availableItem !== '' && !errorAvailableItem){
                let id = stockData.length + 1
                let stockItem = { id, stockCategory, availableItem, cost}
                if(Object.keys(stockToEdit).length > 0){
                    let editStockData = stockData.map((item)=>{
                        if( item.stockCategory === stockItem.stockCategory){
                            item.availableItem = stockItem.availableItem
                            item.cost = stockItem.cost
                        }
                        return item
                    })
                    dispatch(setStock(editStockData))
                    setStockToEdit({})
                }else{
                    stockData.push(stockItem)
                    dispatch(setStock(stockData))
                }
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
            dispatch(setStock(filterStockData))
            setDeletePopup(false)
        }

        const prevStock = () =>{
            let arrayStockCategory = stockData.map((item)=>item.stockCategory)
            let indexOfPreview = arrayStockCategory.indexOf(previewStock.stockCategory)
            if(indexOfPreview > 0){
                let newPreviewStock = stockData[indexOfPreview-1]
                setPreviewStock(newPreviewStock)
            }
        }

        const nextStock = () =>{
            let arrayStockCategory = stockData.map((item)=>item.stockCategory)
            let indexOfPreview = arrayStockCategory.indexOf(previewStock.stockCategory)
            if(indexOfPreview < stockData.length -1){
                let newPreviewStock = stockData[indexOfPreview+1]
                setPreviewStock(newPreviewStock)
            }

        }

        return (
            <div style={{height:'100%'}}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow flex-row-reverse">
                    <img src={logout} className="rounded-circle" onClick={onLogoutClick} style={{height:'28px', width : '35px'}} alt="logout"/>
                    <h2 className="text-center col-sm-11 m-auto text-monospace text-light   "> Canteen Stock</h2>
                </nav>
                <section className= 'w-100 h-50 mx-auto' style={{ paddingLeft:'18%', paddingTop:'10%' }}>
                    <img src={add} onClick={()=>showModal()} className="mb-2 rounded-circle" style={{width:30, height:30, marginLeft:'72%'}} alt='add buton' />
                    <Table
                        stockData={stockData}
                        openPreview={openPreview}
                        openDeleteModal={openDeleteModal}
                        showModal={showModal}
                    />
                </section>
                <AddEditModal
                    show={show}
                    closeModal={closeModal}
                    stockToEdit={stockToEdit}
                    stockCategory={stockCategory}
                    changeStockCategoryInput={changeStockCategoryInput}
                    validateStockCategory={validateStockCategory}
                    availableItem={availableItem}
                    changeAvailableItemInput={changeAvailableItemInput}
                    validateAvailableItem={validateAvailableItem}
                    cost={cost}
                    validateCost={validateCost}
                    changeCostInput={changeCostInput}
                    errorCost={errorCost}
                    errorAvailableItem={errorAvailableItem}
                    errorStockCategory={errorStockCategory}
                    onAddStock={onAddStock}
                />  
                <DeleteModal
                    deletePopup={deletePopup}
                    setDeletePopup={setDeletePopup}
                    stockToDelete={stockToDelete}
                    deleteStockFromStockData={deleteStockFromStockData}
                    cancelDeleteOfStock={cancelDeleteOfStock}

                />
                <PreviewModal
                    viewStockPopup={viewStockPopup}
                    setViewStockPopup={setViewStockPopup}
                    previewStock={previewStock}
                    errorAvailableItem={errorAvailableItem}
                    prevStock={prevStock}
                    nextStock={nextStock}
                    stockData={stockData}
                />
            </div>
        );
}

export default HomePage;