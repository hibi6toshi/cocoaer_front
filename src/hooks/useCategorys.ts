import { PietyCategoryDict, usePietyCategoryContext } from "../providers/PietyCategoryProvider";
import { Option } from "../types";

const useCategorys = () => {
  const pietyCategorys = usePietyCategoryContext() as PietyCategoryDict;

  const getCategoryName = (id: number) =>{
    return pietyCategorys[id];
  };

  const getPietyCategorysDict = () :Option[] => {
    let categoryOptions: Option[] = [];
    Object.keys(pietyCategorys).forEach(key => {
      // categoryOptions = {...categoryOptions, ...{value: key, label: categoryDict[key]} } 
      categoryOptions.push({value: key, label: pietyCategorys[key]})
    });
    return categoryOptions;
  };

  return {
    getCategoryName,
    getPietyCategorysDict
  }

}
 
export default useCategorys;