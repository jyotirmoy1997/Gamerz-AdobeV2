import "./button.styles.css"

const Button = ({content, onClick}) => {
    return(
        <button onClick={onClick} className="button-component">
            {content}
        </button>
    )
}

export default Button