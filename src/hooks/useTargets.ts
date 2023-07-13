import { PietyTargetDict, usePietyTargetContext } from "../providers/PietyTargetProvider";
import { Option } from "../types";

const useTargets = () => {
  const pietyTargets = usePietyTargetContext() as PietyTargetDict;

  const getTargetName = (id: number) => {
    return pietyTargets[id];
  };

  const getPietyTargetsDict = () :Option[] => {
    let targetOptions: Option[] = [];
    Object.keys(pietyTargets).forEach(key => {
      targetOptions.push({value: key, label: pietyTargets[key]})
    });
    return targetOptions;
  }

  return {
    getTargetName,
    getPietyTargetsDict
  };
}
 
export default useTargets;