# 📡 React-Query 사용하기

> References <br> <a href="https://velog.io/@jkl1545/React-Query">react-query</a> _.jkl1545_

## 📃 기본 개념

- **React-Query**는 **서버 상태** 작업에 특화 된 상태 관리 라이브러리이며, **서버 상태 가져오기**, **캐싱**, **동기화/업데이트**를 간편하게 다룰 수 있도록 도와준다.
- **서버 상태**는 각각의 컴포넌트에서 관리되는 input 값 등의 **클라이언트 상태**와는 달리, 데이터베이스에 저장 된 값과 같이 **서버단의 상태**를 의미한다.
- React-Query 상태 분류
  - **fresh** : 새롭게 추가 된 쿼리 👉 컴포넌트가 리렌더링/언마운트 되어도 데이터를 재요청하지 않는다.
  - **fetching** : 요청 중인 쿼리
  - **stale** : 만료된 쿼리 👉 컴포넌트 리렌더링/언마운트 시 데이터를 재요청한다.
  - **inactive** : 비활성화된 쿼리

## 💻 사용하기

- 루트 컴포넌트에 `QueryClient` 인스턴스를 추가 후, `QueryClientProvider` 컴포넌트로 인스턴스에 접근할 수 있도록 감싸준다.

  ```javascript
  import { QueryClientProvider, QueryClient } from "react-query";

  const queryClient = new QueryClient();

  const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
  );

  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    <QueryClientProvider>
  );
  ```

- `useQuery()` : 서버에서 데이터를 가져오기 위한 GET 요청 시에 사용되는 훅이다.

  ```javascript
  const fetchAPI = () => {
    return axios.get("https://jsonplaceholder.typicode.com/todos/1");
  };

  ...

  // 차례대로 서버로부터 받은 데이터, 캐시가 없는 상태에서의 로딩 여부(boolean), 캐시 유무에 관계 없는 페칭 여부(Boolean), 에러 여부(Boolean), 에러 객체
  const { data, isLoading, isFetching, isError, error } = useQuery(
    "example",
    fetchAPI,
    {
      //cacheTime: 500, //언마운트 이후 데이터를 저장하여 캐싱하는 시간
      //staleTime: 500, //쿼리가 fresh 상태에서 stale 상태로 전환되는 시간
      //refetchOnMount: true, //컴포넌트 마운트 시 리페칭
      //refetchOnWindowFocus: true, //브라우저 포커싱되면 리페칭
      //refetchInterval: 500, //지정한 시간 간격으로 리페칭
      //refetchIntervalInBackground: true, //브라우저에 포커스가 없어도 refetchInterval에 지정한 시간만큼 리페칭
      //enabled: false, //컴포넌트가 마운트 되어도 리페칭X (useQuery Hook이 반환하는 referch 함수를 이용하여 리페칭할 수 있다)
      //onSuccess: (data) => console.log(data), //성공 시 동작
      //onError: (err) => console.error(err), //실패 시 동작
      //select: (data) => ({ ...data, data: { ...data.data, title: "김백괴" } }), //데이터 가공
    }
  );
  ```

- `useQueries()` : 여러 데이터 요청을 한 번에 수행할 수 있도록 하는 훅이다.

  ```javascript
  const fetchAPI1 = () => {
    return axios.get("https://jsonplaceholder.typicode.com/todos/1");
  };

  const fetchAPI2 = () => {
    return axios.get("https://jsonplaceholder.typicode.com/todos/2");
  };

  const fetchAPI3 = () => {
    return axios.get("https://jsonplaceholder.typicode.com/todos/3");
  };

  ...

  // 각 요청에 대한 isLoading, data 등의 상태가 담긴 객체들이 배열로 들어온다.
  const res = useQueries([
      {queryKey: 'example1', queryFn: fetchAPI1},
      {queryKey: 'example2', queryFn: fetchAPI2},
      {queryKey: 'example3', queryFn: fetchAPI3},
  ])
  ```

- 비동기적으로 데이터 처리하기

  ```typescript
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
  ```

  - `useQuery` 옵션 중, false값일 경우 컴포넌트가 리렌더링 되어도 리페칭 하지 않는 `enabled` 옵션을 통해 비동기를 구현할 수 있다.

- `useMutation()` : 서버에 POST/PUT/DELETE 요청 시에 사용되는 훅이다.

  ```javascript
  const fetchAPI = (newUser) => {
    return axios.post("http://localhost:8080/users", newUser);
  };

  ...

  // mutate 메서드를 통해 요청을 보낼 수 있다.
  const { mutate, isLoading, isFetching, isError, error } = useMutation(fetchAPI, {
    onSuccess: () => {
    // 캐시가 있는 모든 쿼리를 무효화하며, 이후 새로 데이터를 패칭한다.
    queryClient.invalidateQueries();
  }});

  ...

  mutate(userObj)
  ```

  - 생명 주기에 따라 콜백함수를 작성할 수 있다.

    ```javascript
    useMutation(fetchAPI, {
      onMutate: (variables) => {
        // mutate 함수가 실행되기 직전에 실행
      },
      onSuccess: (data, variables) => {
        // 요청 성공 시 실행
      },
      onError: (error, variables) => {
        // 에러 시 실행
      },
      onSettled: (data, error, variables, context) => {
        // finally와 같이 무조건 실행
      },
    });
    ```
