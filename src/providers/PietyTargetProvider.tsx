import { createContext, useContext, useEffect, useState } from "react";
import { PietyTarget } from "../types";
import { getPietyTargets } from "../apis/pietyTargets";
import Loading from "../components/Elements/Loading";

interface Props {
  children?: React.ReactNode
};

export type PietyTargetDict = {
  [index: string]: string
}

const PietyTargetContext = createContext<{}>({});
export const usePietyTargetContext = () => useContext(PietyTargetContext);

const PietyTargetProvider: React.FC<Props> = ({ children }) => {
  const [pietyTargets, setPietyTargets] = useState<PietyTargetDict>({});

  useEffect(() => {
    const fetchData = async () =>{
      const pietyTargetDatas = await getPietyTargets();
      pietyTargetDatas.forEach((pietyTargetData: PietyTarget) =>{
        setPietyTargets(( prevDic => ({...prevDic, [pietyTargetData.id] : pietyTargetData.name} )))
      })
    };
    fetchData();
  }, []);

  if (pietyTargets === null) return <div><Loading /></div>; 
  return (
    <PietyTargetContext.Provider value={pietyTargets}>
      {children}
    </PietyTargetContext.Provider>
  );
};

export default PietyTargetProvider;