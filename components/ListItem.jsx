const ListItem = ({
  id, 
  name, 
  quantity, 
  unit, 
  checked, 
  handleItemChecked
}) => {
    return (
        <div className="row">
        <div className="col">
        <input onClick={(e) => handleItemChecked(e)} name={id} checked={checked} type="checkbox" />
        </div>
        <div className="col-2 text-start">
          {checked ? <del>{`${quantity} ${unit}`}</del> : `${quantity} ${unit}`}
          </div>
        <div className="col-5 col-md-6 text-start" 
        style={{textDecoration: checked && "line-through"}}
        > {name}
        </div>
       <div className="col-4 col-md-3 btn-group btn-group-sm " role="group"> 
       <button type="button" class="btn btn-outline-primary">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button type="button" class="btn btn-outline-primary">
              <i class="bi bi-files"></i>
            </button>
            <button type="button" class="btn btn-outline-danger">
              <i class="bi bi-trash2-fill"></i>
            </button>
         </div>
        </div>
    )
}

export default ListItem;