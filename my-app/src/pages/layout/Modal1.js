
export const DemoModal =(props) => {
const {title,onClose,children} = props;
    return(
    <div id="myModal" className="modal">
  <div className="modal-content">
    <div className="grid grid-cols-2 border border-b-1">
    <p className="">{title}</p>
    <span className="close" onClick={onClose} >&times;</span>
    </div>
    <div>{children}</div>
  </div>

</div>
)
}