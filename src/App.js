import './App.css';

function App() {

  return (

    <div>
      <Login />
    </div>


    // 페이지 자체 이동 방법
    // <div>
    //   <h1>Bookkeeper</h1>
    //   <nav style={{borderBottom: "solid 1px", paddingBottom: "1rem"}}>
    //     <Link to="/invoices">Invoices</Link>
    //     <br />
    //     <Link to="/expenses">Expenses</Link>
    //   </nav>
    // </div>
    // Link 태그를 사용할 경우 -> URL로 이동하는 to를 쓸 때 '/'를 붙여줘야 한다.


    // 페이지 내에서 컴포넌트만 변경
    // <div>
    //   <h1>Bookkeeper</h1>
    //   <nav style={{borderBottom: "solid 1px", paddingBottom: "1rem"}}>
    //     <Link to="/invoices">Invoices</Link>
    //     <br />
    //     <Link to="/expenses">Expenses</Link>
    //   </nav>
    //   <Outlet />
    //   {/*
    //     Outlet을 작성하면
    //     Invoices와 Expenses의 페이지 링크가 바뀌면서
    //     해당 페이지의 내용이 OUtlet이 위치하는 부분에 나타나게 된다.
    //     이때, nav 내부의 내용은 여전히 고정되어 있다.
    //   */}
    // </div>

  )

}

export default App;
