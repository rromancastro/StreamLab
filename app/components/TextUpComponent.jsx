
export const TextUpComponent = ({fontSize, textContent, active, color = '#000'}) => {
    return <div className="textUpComponent" style={{height: fontSize}}>
                <p style={{transform: active ? 'translateY(5px)' : `translateY(${Number(fontSize) + 10}px)`, fontSize: `${fontSize}px`, color: color}}>{textContent}</p>
        </div>
}