import { useMemo } from "react";

//Hook para simular las peticiones a la API
const useProductAPI = (request: Function, params: any[] = []) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const response = useMemo(() => request(...params), [params]);

  return {
    response,
  };
};

export default useProductAPI;
