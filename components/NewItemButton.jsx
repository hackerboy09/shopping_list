import Swal from "sweetalert2"

const NewItemButton = ({listItems, setListItems}) => {
const newItemModal = async () => {
const {value} = await Swal.fire({
  title: "New Item information",
  html: `
  <input class="swal2-input" id= "name" name="name" placeholder= "Name" type="text" />
  <input class="swal2-input" id= "quantity" name="quantity" placeholder= "Quantity" type="numeric" />
  <input class="swal2-input" id= "unit" name="unit" placeholder= "Unit" type="text" />
  `,
  confirmButtonText: "Add item",
  showCancelButton: true,
  cancelButtonText: "Dismiss",
  focusConfirm: false,
  preConfirm: () => {
    const name = Swal.getPopup().querySelector("#name").value;
    const quantity = Swal.getPopup().querySelector("#quantity").value;
    const unit = Swal.getPopup().querySelector("#unit").value;
    if(!name || !quantity || !unit){
      Swal.showValidationMessage("Please enter full information");
    }
    return{name, quantity, unit}
  }
})
setListItems([
  ...listItems,
  {
    id: listItems.lengh + 1,
    ...value,
    checked :false,
  }
]

)
}
  return (
    <button  class="btn btn-outline-primary"
    onClick={newItemModal}
    type="button"
    >
    <i class="bi bi-plus-circle"></i>
  </button>
  )
}

export default NewItemButton