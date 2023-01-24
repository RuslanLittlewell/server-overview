import React, { useRef, useEffect ,useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const TableHeadSort = ({
  action,
  filterParams,
  column,
}) => {
  const sortValues = filterParams?.sort?.split(',');
  const ref = useRef(null);
  const [state, setState] = useState(0);

  useEffect(() => {
    const initPosition = sortValues?.[0] === column && sortValues?.[1] === 'DESC' ? 180 : 0;
    ref.current.style.transform = `rotate(${initPosition}deg)`;
    setState(initPosition)
  }, [filterParams, sortValues, column])

  const handleClick = () => {
   ref.current.style.transform = `rotate(${state + 180}deg)`;
   setState(s => s >= 180 ? 0 : s + 180)
   action(state !== 0 ? 'ASC' : 'DESC');
  };

  return (
    <button ref={ref} onClick={() => handleClick()}>
      <ArrowDownwardIcon />
    </button>
  );
};

export default TableHeadSort;
