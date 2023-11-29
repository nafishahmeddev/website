import { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types";

export default function Typewriter({ text = "", className, time }) {
    const [_text, setText] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [isReversed, setIsRevered] = useState(false);

    const _do = useCallback(() => {
        if (isReversed) {
            if (filtered.length == 0) {
                setIsRevered(false);
            } else {
                const arr = [...filtered];
                arr.pop();
                setFiltered(arr);
            }
        } else {
            if (filtered.length < _text.length) {
                setFiltered([...filtered, _text[filtered.length]]);
            } else if (filtered.length == _text.length) {
                setIsRevered(true);
            }
        }
    }, [_text, filtered, isReversed]);

    useEffect(() => {
        setText(text.split(""));
    }, [text]);
    useEffect(() => {
        const interval = setInterval(()=>_do(), time ?? 200);
        return ()=>clearInterval(interval);
    }, [_do, time])

    return <span className={className}>{filtered.join("")} <span className="animate-pulse">_</span></span>
}

Typewriter.propTypes = {
    text: PropTypes.string,
    className : PropTypes.string,
    time: PropTypes.number
}