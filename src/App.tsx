import "./App.css";
import SearchForm from "./components/SearchForm";
import TableRow from "./components/TableRow";
import { useEffect, useState } from "react";
import { useAsyncInternal } from "./hooks/useAsync";
import { getProducts, searchProducts } from "./services/products";

function App() {
  // to store all  products
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [numberOfItem, setNumberOfItem] = useState<number>(10);
  const [search, setSearch] = useState("");

  const {
    error: errorSearch,
    executeFn: searchFoo,
    loading: loadingSearch,
    value: searchData,
  } = useAsyncInternal(searchProducts, false, []);

  const {
    error: errorP,
    executeFn,
    loading,
    value,
  } = useAsyncInternal(getProducts, false, []);

  // to handle submission of the form
  const submitHandler = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!search) return;
    const data = { search, limit: numberOfItem };
    searchFoo(data)
      .then((res: ResponseTypeProducts) => {
        setProducts(res.products);
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
      });

    setSearch("");
  };

  useEffect(
    function () {
      executeFn(page, numberOfItem)
        .then((res: ResponseTypeProducts) => {
          console.log("error : ", res);
          setProducts(res.products);
        })
        .catch((err) => {
          console.log(err);
          setProducts([]);
        });
    },
    [page, numberOfItem, executeFn]
  );

  console.log("P : ", value, errorP, loading);

  return (
    <div className="container">
      <header className="header">
        <h1>
          <a href="#">Adaa Test</a>
        </h1>
        <nav>
          <SearchForm
            onChange={(e) => setSearch(e.target.value)}
            search={search}
            submitHandler={submitHandler}
          />
        </nav>
      </header>
      <main>
        <select
          onChange={(e) => {
            setNumberOfItem(Number(e.target.value));
            console.log("value  : ", e.target.value);
          }}
          className="form-select"
        >
          <option selected>Choose the number of items(default=10)</option>
          <option value="5">Five</option>
          <option value="10">Ten</option>
          <option value="20">Twenty</option>
          <option value="50">Fifty</option>
          <option value="100">Hundred</option>
        </select>
        <br />
        <div className="stack flex justify-content-between">
          <button
            onClick={() => setPage((prev) => (prev >= 1 ? prev - 1 : prev))}
            type="button"
            className="btn btn-primary"
            disabled={page <= 0}
          >
            Prev
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            type="button"
            className="btn btn-primary"
            disabled={page >= 20}
          >
            Next
          </button>
        </div>
        <br />
        {loading || loadingSearch ? (
          <p>Loading...</p>
        ) : errorP || errorSearch ? (
          <p>
            err : {errorP}-{errorSearch}
          </p>
        ) : !products?.length ? (
          <p>Not Found !</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Descriprtion</th>
                <th scope="col">Price</th>
                <th scope="col">DiscountPercentage</th>
                <th scope="col">Rating</th>
                <th scope="col">Stock</th>
                <th scope="col">Brand</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: Product) => {
                return <TableRow key={product.id} product={product} />;
              })}
            </tbody>
          </table>
        )}
      </main>

      <footer>copyright &copy; @Ivan01-tech</footer>
    </div>
  );
}

export default App;
