import React, { useRef } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};
  const [userData, setUserData] = useState(initialUserData);
  const navigate = useNavigate();
  // returns current path.
  const { pathname } = useLocation();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const ref = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/") navigate("/main");
      } else {
        navigate("/");
      }
    });
  }, [auth, navigate, pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // setSearchValue(e.target.value);
      // console.log(searchValue);
      navigate(`/search?q=${searchValue}`);
    }
  };

  const handleClick = () => {
    navigate(`/search?q=${searchValue}`);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChange = (e) => {
    if (pathname === "/search") {
      setSearchValue(e.target.value);
      // console.log(e.target.value);
      navigate(`?q=${e.target.value}`);
    } else {
      setSearchValue(e.target.value);
    }
  };

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => console.error(error));
  };

  const handleLogout = () => {
    signOut(auth)
      .then((result) => {
        setUserData({});
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="Diesney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input
            className="nav__input"
            value={searchValue}
            // keyboard typing
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="제목을 검색해주세요."
            ref={ref}
            autoFocus={true}
          ></Input>
          <Clickbutton>
            <button onClick={handleClick}>Enter</button>
          </Clickbutton>
          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleLogout}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  );
};

export default Nav;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const SignOut = styled.div/*css*/ `
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const Login = styled.a/*css*/ `
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Clickbutton = styled.div`
  position: absolute;
  right: 35%;
`;
const Input = styled.input/*css*/ `
  position: fixed;
  left: 50%;

  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
  outline: none;
`;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
  transition: 0.4s;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;
