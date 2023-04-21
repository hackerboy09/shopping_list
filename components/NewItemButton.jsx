import Swal from "sweetalert2"

const NewItemButton = () => {
const newItemModal =() => {
Swal.fire('Any fool can use a computer')
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