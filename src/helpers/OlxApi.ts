import Cookies from "js-cookie";
import React from "react";
import qs from "qs";
import { AutomaticPrefetchPlugin } from "webpack";


const BASEAPI: string = 'https://api.b7web.com.br/ping/';


const apiGet = async (endpoint: string, body: any = []) => {
  if (!body.token) {

    let token = Cookies.get('token');
    if (token) {
      body.token = token;
    };

  };


  const res = await fetch(`{BASEAPI + endpoint}?${qs.stringify(body)}`)

  const json = await res.json()

  if (json.notallowed) {
    window.location.href = '/signin'
    return;
  }

  return json;
}


const apiPost = async (endpoint: string, body: any = []) => {
  if (!body.token) {

    let token = Cookies.get('token');
    if (token) {
      body.token = token;
    };
  };

  const res = await fetch(BASEAPI + endpoint, {
    method: "Post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });
  const json = await res.json()

  if (json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
}


const OlxAPI = {

  login: async (email: string, password: string) => {

    const json = await apiPost(
      '/user/signin',
      { email, password }
    );
    return json;
  },
  register: async (name: string, email: string, password: string, stateLoc: string) => {
    const json = await apiPost(
      '/user/signup',
      { name, email, password, state: stateLoc }
    );
    return json;
  },
  getState: async () => {
    const json = await apiGet(
      '/states'
    );
    return json.states;
  },
  getCategories: async () => {
    const json = await apiGet(
      '/categories'
    );
    return json.categories;
  },
  getAds: async (options: object) => {
    const json = await apiGet(
      '/ad/list',
      options
    );
    return json;
  }
};

export default () => OlxAPI;