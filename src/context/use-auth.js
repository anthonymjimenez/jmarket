import React, { useState, useEffect, useContext, createContext } from "react";
import { post, deleteAction, put, url, checkResponse } from "../utils/GenUtils";
import { findUserIndexes, findIndexById } from "../utils/UserUtils";
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
  const [user, setUser] = useState(false);
  const [stocks, setStocks] = useState(false);

  const signin = (state) => {
    fetch(`${url}login`, {
      ...post,
      body: JSON.stringify({ ...state }),
    })
      .then(checkResponse)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("id", data.user.id);
        setUser(data.user.id);
        setStocks(fetchStocks(data.user.id));
      })
      .catch(console.error);
  };

  const signup = (state) => {
    console.log(state);
    fetch(`${url}users`, {
      ...post,
      body: JSON.stringify({ user: state }),
    })
      .then(checkResponse)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("id", data.user.id);
        setUser(data.user);
        setStocks(fetchStocks(data.user.id));
      })
      .catch(console.error);
  };

  const signInFromToken = async () => {
    const token = localStorage.getItem("id"); // set user with token if(token & user=dne) <- that means token was set and page has been reset, in that case use token to fetch user
    // use auth routes to restrict all routes before token is set, then use token to render user
    if (token) {
      try {
        let resp = await fetch(`${url}auto_login`, {
          ...post,
          body: JSON.stringify({ id: token }),
        });
        checkResponse(resp);
        console.log("hello");
        let data = await resp.json();
        setUser(await data);
        setStocks(await fetchStocks(data.id));
      } catch (err) {
        console.error(err);
        localStorage.removeItem("id");
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

    let resp = await fetch(`${url}${user.id}`, {
      ...deleteAction,
    });
    let data = await resp;
    console.log(data);
    localStorage.clear();
  };
  const signout = () => {
    localStorage.clear();
    setUser(false);
  };

  const removeUserStock = async (stock_id, userData_id) => {
    console.log(stock_id, userData_id);
    // let copyUser = user;
    // console.log(copyUser.stocks.findIndex(s => s.id == stock_id))
    // copyUser.stocks.map((s) => console.log(s.id));

    // copyUser.stocks = copyUser.stocks.filter((s) => s.id == stock_id);
    // copyUser.user_owned_stocks = copyUser.user_owned_stocks.filter(
    //   (s) => s.id == userData_id
    // );
    const token = localStorage.getItem("id"); // set user with token if(token & user=dne) <- that means token was set and page has been reset, in that case use token to fetch user
    // use auth routes to restrict all routes before token is set, then use token to render user
    if (token) {
      let resp = await fetch(`${url}auto_login`, {
        ...post,
        body: JSON.stringify({ id: token }),
      });
      let data = await resp.json();
      if (data.errors) {
        console.log(data.errors);
        localStorage.removeItem("id");
      } else {
        setUser(await data);
      }
    }

    let copyStocks = stocks.map((s) => {
      if (s.id == stock_id) {
        s.user_owned_stocks.length = 0;
      }
      return s;
    });

    //console.log(copyStocks, copyUser)
    setStocks(copyStocks);
    //setUser(copyUser);
  };
  const updateState = (userData) => {
    updateUser(userData);
    updateStock(userData);
  };
  const updateUser = ({ stock, user: newUser, ...userStockData }) => {
    // frontend update stock
    let copyUser = user;
    let [userStockIndex, userStockDataIndex] = findUserIndexes(
      copyUser,
      stock,
      userStockData
    );

    copyUser.stocks[userStockIndex] = stock;
    copyUser.user_owned_stocks[userStockDataIndex] = userStockData;

    setUser({
      stocks: copyUser.stocks,
      user_owned_stocks: copyUser.user_owned_stocks,
      ...newUser,
    });
  };

  // create use-stocks?
  const updateStock = ({ stock, user: newUser, ...userStockData }) => {
    let copyStocks = stocks;
    copyStocks[
      findIndexById(copyStocks, stock)
    ].user_owned_stocks[0] = userStockData;

    setStocks(copyStocks);
  };

  const fetchStocks = async (id) => {
    try {
      let resp = await fetch(`${url}stocks`);
      checkResponse(resp);
      let stocks = await resp.json();
      return stocks.map((s) => {
        let userData = s.user_owned_stocks.filter(
          (stock) => stock.user_id == id
        );
        s.user_owned_stocks = userData;
        return s;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const buyStock = async (state) => {
    try {
      let resp = await fetch(`${url}buystock`, {
        ...put,
        body: JSON.stringify({
          user_stock_id: state.user_stock_id,
          sharesBought: parseFloat(state.shares),
        }),
      });
      checkResponse(resp);
      let userData = await resp.json();
      console.log(userData);
      updateState(userData);
    } catch (err) {
      console.error(err);
    }
  };

  const sellStock = async (state) => {
    try {
      let resp = await fetch(`${url}sellstock`, {
        ...put,
        body: JSON.stringify({
          user_stock_id: state.user_stock_id,
          sharesSold: parseFloat(state.shares),
        }),
      });
      checkResponse(resp);
      let userData = await resp.json();
      userData.deleted
        ? removeUserStock(state.stock_id, state.user_stock_id)
        : updateState(userData);
    } catch (err) {
      console.error(err);
    }
  };

  const createStock = async (state) => {
    try {
      let resp = await fetch(`${url}user_owned_stocks`, {
        ...post,
        body: JSON.stringify({
          user: state.user_id,
          stock: state.stock_id,
          sharesOwned: parseFloat(state.shares),
        }),
      });
      checkResponse(resp);
      let userData = await resp.json();
      console.log(userData);
      addNewStock(userData);
    } catch (err) {
      console.error(err);
    }
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
