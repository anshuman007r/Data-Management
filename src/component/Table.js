import Delete from '../assets/deleteIcon.png'
import Edit from '../assets/editIcon.png'
import Preview from '../assets/previewIcon.png'

function Table(props){

    return(
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
                    props.stockData.map((item,index)=>(
                        <tr className="shadow">
                            <th scope="row">{index+1}</th>
                            <td>{item.stockCategory}</td>
                            <td>{item.availableItem}</td>
                            <td>{item.cost}</td>
                            <td className='row justify-content-around w-75' style={{marginLeft:-10}}>
                                <img src={Preview} onClick={()=> props.openPreview(item)}  style={{width:14 , height:14}} alt="action_preview"/>
                                <img src={Edit} onClick={()=> props.showModal(item)} style={{width:15 , height:14}} alt="action_edit"/>
                                <img src={Delete} onClick={()=>props.openDeleteModal(item.stockCategory)} style={{width:14 , height:14}} alt="action_delete"/>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )

}

export default Table