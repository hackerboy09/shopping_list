import Swal from "sweetalert2";
import {v4 as uuidv4} from "uuid"

const ListItem = ({
    item,
    handleItemChecked,
    listItems,
    setListItems
}) => {
    const { id, name, quantity, unit, checked } = item;

    const deleteListItem = () => {
        const newList = listItems.filter(item => item.id !== id)
        localStorage.setItem("listItems", JSON.stringify(newList));
        setListItems(newList);
    }

    const cloneListItem = () => {
        const newList = [
            ...listItems,
            {
                ...item,
                id: uuidv4(),
            }
        ];
        localStorage.setItem("listItems", JSON.stringify(newList));
        setListItems(newList);
    }

    const editListItem = async () => {
        const { value } = await Swal.fire({
            title: "Item Information",
            html: `
                <input 
                    type="text"
                    id="name" 
                    name="name" 
                    placeholder="Name"
                    class="swal2-input"
                    value="${name}"
                />
                <input 
                    type="number" 
                    id="quantity" 
                    name="quantity"
                    placeholder="Quantity"
                    class="swal2-input"
                    value="${quantity}" 
                />
                <input 
                    type="text" 
                    id="unit" 
                    name="unit"
                    placeholder="Unit"
                    class="swal2-input"
                    value="${unit}" 
                />
            `,
            confirmButtonText: "Save item",
            showCancelButton: true,
            cancelButtonText: "Dismiss",
            focusConfirm: false,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector("#name").value;
                const quantity = Swal.getPopup().querySelector("#quantity").value;
                const unit = Swal.getPopup().querySelector("#unit").value;
                if (!name || !quantity || !unit) {
                    Swal.showValidationMessage("Please enter full information");
                }
                return { name, quantity, unit };
            },
        })
        
        if(!value.name || !value.quantity || !value.unit) return;

        const newList= listItems.map((item) => {
            if(item.id === id){
                item.name = value.name;
                item.quantity = value.quantity;
                item.unit = value.unit;
            }
            return item;
        })
        localStorage.setItem("listItems", JSON.stringify(newList));
        setListItems(newList);
    }

    return (
        <div className="row">
            <div className="col">
                <input onClick={(e) => handleItemChecked(e)} name={id} checked={checked} type="checkbox" />
            </div>
            <div className="col-2 text-start">
                {/*listItems.first && <del>1 kg</del>*/}
                {/*!listItems.first && "1 kg"*/}
                {checked ? <del>{`${quantity} ${unit}`}</del> : `${quantity} ${unit}`}
            </div>
            <div className="col-5 col-md-6 text-start" style={{ textDecoration: checked && "line-through" }}>{name}</div>
            <div className="col-4 col-md-3 btn-group btn-group-sm" role="group">
                <button type="button" onClick={editListItem} class="btn btn-outline-primary">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" onClick={cloneListItem} class="btn btn-outline-primary">
                    <i class="bi bi-files"></i>
                </button>
                <button type="button" onClick={deleteListItem} class="btn btn-outline-danger">
                    <i class="bi bi-trash2-fill"></i>
                </button>
            </div>
        </div>
    )
}

export default ListItem;