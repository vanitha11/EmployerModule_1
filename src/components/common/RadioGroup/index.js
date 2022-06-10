export default (props) => {
    return (
        props.options.map(option => (
            <li className="list-group-item">
                <label className="custom-control custom-radio">
                    <input type="radio" name={props.name} value={props.id} checked={option.id === Number(props.value)}
                           onChange={(event => props.updateValue({name: props.name, value: option.id}))}/>
                    <span>{option.name}</span>
                </label>
            </li>
        ))
    )
}
