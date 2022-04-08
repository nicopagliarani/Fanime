import React from "react";
import { Link } from "react-router-dom";

export function FirstPage() {
  return (
    <div class="d-flex justify-content-center">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Username"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div class="d-flex justify-content-center">
          <p>
            You don't have an account?
            <Link to={"/signup"}>
              <button type="submit" class="btn btn-primary">
                Sign up
              </button>
            </Link>
          </p>
        </div>
        <div class="container">
          <div class="row">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <Link to={"/home"}>
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}


