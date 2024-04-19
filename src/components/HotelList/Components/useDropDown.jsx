import { useState } from "react";

export function useDropdown() {
  const [isClicked, setClicked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded((prevState) => !prevState);
    setClicked(true);
  };

  return { isExpanded, toggleDropdown, isClicked };
}
