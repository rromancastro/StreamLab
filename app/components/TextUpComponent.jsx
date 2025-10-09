
export const TextUpComponent = ({fontSize, textContent, active, color = '#000'}) => {
    return <div className="textUpComponent" style={{height: fontSize + 10}}>
                <p style={{transform: active ? 'translateY(15px)' : `translateY(${Number(fontSize) + 25}px)`, fontSize: `${fontSize}px`, color: color}}>{textContent}</p>
        </div>
}