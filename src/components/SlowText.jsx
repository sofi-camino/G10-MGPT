import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// https://stackoverflow.com/questions/65735012/
export const SlowText = (props) => {
  const { speed, text } = props;
  const [placeholder, setPlaceholder] = useState("");

  const index = useRef(0);
  const prevText = useRef("");

  useEffect(() => {
    function tick() {
      index.current++;
      setPlaceholder((prev) => prev + text[index.current]);
    }
    if (prevText.current !== text) {
      index.current = 0;
      setPlaceholder("");
    }
    if (index.current < text.length - 1) {
      prevText.current = text;
      let addChar = setInterval(tick, speed);
      return () => clearInterval(addChar);
    }
  }, [placeholder, speed, text]);
  return (
    <span>
      {text !== "" && text[0]}
      {placeholder}
    </span>
  );
};

SlowText.propTypes = {
  speed: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};
