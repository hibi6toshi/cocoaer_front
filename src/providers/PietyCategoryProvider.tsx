import { createContext, useContext, useEffect, useState } from "react";
import { PietyCategory } from "../types";
import { getPietyCategorys } from "../apis/pietyCategorys";

interface Props {
  children?: React.ReactNode
};

export type PietyCategoryDict = {
  [index: string]: string
}

const PietyCategoryContext = createContext<{}>({});
export const usePietyCategoryContext = () => useContext(PietyCategoryContext);

const PietyCategoryProvider: React.FC<Props> = ({ children }) => {
  const [pietyCategorys, setPietyCategorys] = useState<PietyCategoryDict>({});

  useEffect(() => {
    const fetchData = async () =>{
      const pietyCategoryDatas = await getPietyCategorys();
      pietyCategoryDatas.forEach((pietyCategoryData: PietyCategory) =>{
        setPietyCategorys(( prevDic => ({...prevDic, [pietyCategoryData.id] : pietyCategoryData.name} )))
      })
    };
    fetchData();
  }, []);

  if (pietyCategorys === null) return <div>Loading...</div>; 

  return (
    <PietyCategoryContext.Provider value={pietyCategorys}>
      {children}
    </PietyCategoryContext.Provider>
  );
};

export default PietyCategoryProvider;