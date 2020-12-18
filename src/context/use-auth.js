import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...

// ... available to any child component that calls useAuth().

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...

// ... and re-render when it changes.

export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [stocks, setStocks] = useState(null);

  const signin = (state) => {
    console.log(state);
    fetch(`http://localhost:3000/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...state }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("id", data.user.id);
        setUser(data.user.id);
        setStocks(fetchStocks(data.user.id));
      })
      .catch(console.error);
  };

  // updatecrypto function ? like update balance but replace user crypto
  const signup = (state) => {
    console.log(state);
    fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: state }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.user.id) localStorage.setItem("id", data.user.id);
        setUser(data.user);
        setStocks(fetchStocks(data.user.id));
      })
      .catch(console.error);
  }; //appendUserInfo

  const signInFromToken = async () => {
    console.log("hello");
    const token = localStorage.getItem("id"); // set user with token if(token & user=dne) <- that means token was set and page has been reset, in that case use token to fetch user
    // use auth routes to restrict all routes before token is set, then use token to render user
    if (token) {
      let resp = await fetch(`http://localhost:3000/api/v1/auto_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id: token }),
      });
      let data = await resp.json();
      if (data.errors) {
        console.log(data.errors);
        localStorage.removeItem("id");
      } else {
        setUser(await data);
        setStocks(await fetchStocks(data.id));
      }
    }
  };

  // const updateUser = async (newUserObject) => {
  //   const token = localStorage.getItem("token"); // set user with token if(token & user=dne) <- that means token was set and page has been reset, in that case use token to fetch user
  //     let resp = await fetch(`http://localhost:3000/api/v1/users/`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-type': 'application/json'
  //       },
  //       method: 'PUT'
  //     });
  //     let data = await resp.json();
  //     setUser(await data)

  // };

  const deleteUser = async () => {
    // const token = localStorage.getItem("id"); // set user with token if(token & user=dne) <- that means token was set and page has been reset, in that case use token to fetch user

    let resp = await fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "DELETE",
    });
    let data = await resp;
    console.log(data);
    localStorage.clear();
  };
  const signout = () => {
    localStorage.clear();
    setUser(false);
  };

  const removeUserStock = (stock_id, userData_id) => {
    console.log(stock_id, userData_id)
    let copyUser = user;
    console.log(copyUser.stocks.findIndex(s => s.id == stock_id))
    copyUser.stocks.map((s) => console.log(s.id));

    copyUser.stocks = copyUser.stocks.filter((s) => s.id == stock_id);
    copyUser.user_owned_stocks = copyUser.user_owned_stocks.filter(
      (s) => s.id == userData_id
    );

    let copyStocks = stocks.map((s) => {
      if (s.id == stock_id) {
        s.user_owned_stocks.length = 0;
      }
      return s;
    });
  
    console.log(copyStocks, copyUser)
    setStocks(copyStocks);
    setUser(copyUser);
  };

  const updateUser = ({ stock, user: newUser, ...userStockData }) => {
    // frontend update stock
    console.log(newUser);
    let copyUser = user;
    let userStockIndex = copyUser.stocks.findIndex((s) => s.id == stock.id);
    let userStockDataIndex = copyUser.user_owned_stocks.findIndex(
      (s) => s.id == userStockData.id
    );
    console.log(userStockIndex, userStockDataIndex)
    if(userStockIndex !== -1) {
    copyUser.stocks[userStockIndex] = stock;
    copyUser.user_owned_stocks[userStockDataIndex] = userStockData;
    }else {
      console.log('egllo')
      copyUser.stocks[copyUser.stocks.length] = stock
      copyUser.user_owned_stocks[copyUser.user_owned_stocks.length] = userStockData
    }

    let tempUser = {
      stocks: copyUser.stocks,
      user_owned_stocks: copyUser.user_owned_stocks,
      ...newUser,
    };

    setUser(tempUser);
  };

  // create use-stocks?
  const updateStock = ({ stock, user: newUser, ...userStockData }) => {
    console.log(stock, newUser, userStockData);
    let copyStocks = stocks;
    let stockIndex = copyStocks.findIndex((s) => s.id == stock.id);
    copyStocks[stockIndex].user_owned_stocks[0] = userStockData;

    setStocks(copyStocks);

    console.log(stocks);
  };

  const fetchStocks = async (id) => {
    let s = await fetch("http://localhost:3000/api/v1/stocks");
    let stocks = await s.json();
    return stocks.map((s) => {
      let userData = s.user_owned_stocks.filter((stock) => stock.user_id == id);
      s.user_owned_stocks = userData;
      return s;
    });
  };

  const buyStock = async (state) => {
    let resp = await fetch(`http://localhost:3000/api/v1/buystock`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_stock_id: state.user_stock_id,
        sharesBought: parseFloat(state.shares),
      }),
    });
    let userData = await resp.json();
    console.log(userData);
    updateUser(userData);
    updateStock(userData);
  };

  const sellStock = async (state) => {
    let resp = await fetch(`http://localhost:3000/api/v1/sellstock`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_stock_id: state.user_stock_id,
        sharesSold: parseFloat(state.shares),
      }),
    });
    let userData = await resp.json();
    if(userData.deleted) {
      console.log('yo')
      removeUserStock(state.stock_id, state.user_stock_id)
    }
    else {
    console.log(userData);
    updateUser(userData);
    updateStock(userData);
  }};

  const createStock = async (state) => {
    let resp = await fetch(`http://localhost:3000/api/v1/user_owned_stocks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: state.user_id,
        stock: state.stock_id,
        sharesOwned: parseFloat(state.shares),
      }),
    });
    let userData = await resp.json();
    console.log(userData);
    addNewStock(userData);
    // updateUser(userData)
    // updateStock(userData)
  };

  const addNewStock = ({ user_owned_stock }) => {
    console.log(user_owned_stock);
    // add here still call updateStock()
    updateUser(user_owned_stock);
    updateStock(user_owned_stock);
  };

  // Subscribe to user on mount

  // Because this sets state in the callback it will cause any ...

  // ... component that utilizes this hook to re-render with the ...

  // ... latest auth object.

  useEffect(() => {
    (() => (user ? setUser(user) : setUser(false)))();
    (() => (stocks ? setStocks(stocks) : setStocks(false)))();
  }, []);

  // Return the user object and auth methods

  return {
    user,
    stocks,
    buyStock,
    sellStock,
    createStock,
    signin,
    signup,
    signout,
    signInFromToken,
    deleteUser,
  };
}
