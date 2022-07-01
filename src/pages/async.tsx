import axios from "axios";
import { useQuery } from "react-query";

const fetchArrAPI = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos");
};

const fetchOneAPI = (id: number) => {
  return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
};

function Async() {
  const { data: arrData } = useQuery("exampleArr", fetchArrAPI);

  const { data: oneData } = useQuery(
    "exampleOne",
    () => fetchOneAPI(arrData?.data.length - 1),
    {
      enabled: !!arrData?.data.length,
    }
  );

  return <>{oneData?.data?.title}</>;
}

export default Async;
