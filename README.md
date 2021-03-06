# π‘ React-Query μ¬μ©νκΈ°

> References <br> <a href="https://velog.io/@jkl1545/React-Query">react-query</a> _.jkl1545_

## π κΈ°λ³Έ κ°λ

- **React-Query**λ **μλ² μν** μμμ νΉν λ μν κ΄λ¦¬ λΌμ΄λΈλ¬λ¦¬μ΄λ©°, **μλ² μν κ°μ Έμ€κΈ°**, **μΊμ±**, **λκΈ°ν/μλ°μ΄νΈ**λ₯Ό κ°νΈνκ² λ€λ£° μ μλλ‘ λμμ€λ€.
- **μλ² μν**λ κ°κ°μ μ»΄ν¬λνΈμμ κ΄λ¦¬λλ input κ° λ±μ **ν΄λΌμ΄μΈνΈ μν**μλ λ¬λ¦¬, λ°μ΄ν°λ² μ΄μ€μ μ μ₯ λ κ°κ³Ό κ°μ΄ **μλ²λ¨μ μν**λ₯Ό μλ―Ένλ€.
- React-Query μν λΆλ₯
  - **fresh** : μλ‘­κ² μΆκ° λ μΏΌλ¦¬ π μ»΄ν¬λνΈκ° λ¦¬λ λλ§/μΈλ§μ΄νΈ λμ΄λ λ°μ΄ν°λ₯Ό μ¬μμ²­νμ§ μλλ€.
  - **fetching** : μμ²­ μ€μΈ μΏΌλ¦¬
  - **stale** : λ§λ£λ μΏΌλ¦¬ π μ»΄ν¬λνΈ λ¦¬λ λλ§/μΈλ§μ΄νΈ μ λ°μ΄ν°λ₯Ό μ¬μμ²­νλ€.
  - **inactive** : λΉνμ±νλ μΏΌλ¦¬

## π» μ¬μ©νκΈ°

- λ£¨νΈ μ»΄ν¬λνΈμ `QueryClient` μΈμ€ν΄μ€λ₯Ό μΆκ° ν, `QueryClientProvider` μ»΄ν¬λνΈλ‘ μΈμ€ν΄μ€μ μ κ·Όν  μ μλλ‘ κ°μΈμ€λ€.

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

- `useQuery()` : μλ²μμ λ°μ΄ν°λ₯Ό κ°μ Έμ€κΈ° μν GET μμ²­ μμ μ¬μ©λλ νμ΄λ€.

  ```javascript
  const fetchAPI = () => {
    return axios.get("https://jsonplaceholder.typicode.com/todos/1");
  };

  ...

  // μ°¨λ‘λλ‘ μλ²λ‘λΆν° λ°μ λ°μ΄ν°, μΊμκ° μλ μνμμμ λ‘λ© μ¬λΆ(boolean), μΊμ μ λ¬΄μ κ΄κ³ μλ νμΉ­ μ¬λΆ(Boolean), μλ¬ μ¬λΆ(Boolean), μλ¬ κ°μ²΄
  const { data, isLoading, isFetching, isError, error } = useQuery(
    "example",
    fetchAPI,
    {
      //cacheTime: 500, //μΈλ§μ΄νΈ μ΄ν λ°μ΄ν°λ₯Ό μ μ₯νμ¬ μΊμ±νλ μκ°
      //staleTime: 500, //μΏΌλ¦¬κ° fresh μνμμ stale μνλ‘ μ νλλ μκ°
      //refetchOnMount: true, //μ»΄ν¬λνΈ λ§μ΄νΈ μ λ¦¬νμΉ­
      //refetchOnWindowFocus: true, //λΈλΌμ°μ  ν¬μ»€μ±λλ©΄ λ¦¬νμΉ­
      //refetchInterval: 500, //μ§μ ν μκ° κ°κ²©μΌλ‘ λ¦¬νμΉ­
      //refetchIntervalInBackground: true, //λΈλΌμ°μ μ ν¬μ»€μ€κ° μμ΄λ refetchIntervalμ μ§μ ν μκ°λ§νΌ λ¦¬νμΉ­
      //enabled: false, //μ»΄ν¬λνΈκ° λ§μ΄νΈ λμ΄λ λ¦¬νμΉ­X (useQuery Hookμ΄ λ°ννλ referch ν¨μλ₯Ό μ΄μ©νμ¬ λ¦¬νμΉ­ν  μ μλ€)
      //onSuccess: (data) => console.log(data), //μ±κ³΅ μ λμ
      //onError: (err) => console.error(err), //μ€ν¨ μ λμ
      //select: (data) => ({ ...data, data: { ...data.data, title: "κΉλ°±κ΄΄" } }), //λ°μ΄ν° κ°κ³΅
    }
  );
  ```

- `useQueries()` : μ¬λ¬ λ°μ΄ν° μμ²­μ ν λ²μ μνν  μ μλλ‘ νλ νμ΄λ€.

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

  // κ° μμ²­μ λν isLoading, data λ±μ μνκ° λ΄κΈ΄ κ°μ²΄λ€μ΄ λ°°μ΄λ‘ λ€μ΄μ¨λ€.
  const res = useQueries([
      {queryKey: 'example1', queryFn: fetchAPI1},
      {queryKey: 'example2', queryFn: fetchAPI2},
      {queryKey: 'example3', queryFn: fetchAPI3},
  ])
  ```

- λΉλκΈ°μ μΌλ‘ λ°μ΄ν° μ²λ¦¬νκΈ°

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

  - `useQuery` μ΅μ μ€, falseκ°μΌ κ²½μ° μ»΄ν¬λνΈκ° λ¦¬λ λλ§ λμ΄λ λ¦¬νμΉ­ νμ§ μλ `enabled` μ΅μμ ν΅ν΄ λΉλκΈ°λ₯Ό κ΅¬νν  μ μλ€.

- `useMutation()` : μλ²μ POST/PUT/DELETE μμ²­ μμ μ¬μ©λλ νμ΄λ€.

  ```javascript
  const fetchAPI = (newUser) => {
    return axios.post("http://localhost:8080/users", newUser);
  };

  ...

  // mutate λ©μλλ₯Ό ν΅ν΄ μμ²­μ λ³΄λΌ μ μλ€.
  const { mutate, isLoading, isFetching, isError, error } = useMutation(fetchAPI, {
    onSuccess: () => {
    // μΊμκ° μλ λͺ¨λ  μΏΌλ¦¬λ₯Ό λ¬΄ν¨ννλ©°, μ΄ν μλ‘ λ°μ΄ν°λ₯Ό ν¨μΉ­νλ€.
    queryClient.invalidateQueries();
  }});

  ...

  mutate(userObj)
  ```

  - μλͺ μ£ΌκΈ°μ λ°λΌ μ½λ°±ν¨μλ₯Ό μμ±ν  μ μλ€.

    ```javascript
    useMutation(fetchAPI, {
      onMutate: (variables) => {
        // mutate ν¨μκ° μ€νλκΈ° μ§μ μ μ€ν
      },
      onSuccess: (data, variables) => {
        // μμ²­ μ±κ³΅ μ μ€ν
      },
      onError: (error, variables) => {
        // μλ¬ μ μ€ν
      },
      onSettled: (data, error, variables, context) => {
        // finallyμ κ°μ΄ λ¬΄μ‘°κ±΄ μ€ν
      },
    });
    ```
